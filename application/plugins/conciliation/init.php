<?php
 
_auth();
 include_once "i18n/$config[language].php";
 include_once "OfxParser/Parser.php";

$ui->assign('_application_menu', 'conciliation');
$ui->assign('_title', 'Conciliation'.' - '. $config['CompanyName']);
$ui->assign('_st', 'Conciliation');
$action = $routes['2'];
$user = User::_info();
$ui->assign('user', $user);
define('CONCILIATION_URL', APP_URL.'/application/plugins/conciliation');
define('BANK_STATEMENTS_PATH', 'application/storage/conciliation/');

 
switch ($action) {
    case 'load':
        
        $ui->assign('_include','load');
        $ui->assign('_L',$_L);

        $css = Asset::css(array('dropzone/dropzone','modal'));
        $js = Asset::js(array('modal','dropzone/dropzone'));


        if($_SERVER['HTTP_HOST'] == 'localhost'){
            $js .= '<script src="https://unpkg.com/react@15/dist/react.js"></script>
                    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>';
        }else{
            $js .= '<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
                    <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>';
        }

        $js .= '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
                <script type="text/babel" src="'.CONCILIATION_URL.'/lib/load.jsx"></script>
                <script type="text/javascript" src="'.CONCILIATION_URL.'/lib/load.js"></script>';        

        $ui->assign('xheader', $css);        
        $ui->assign('xfooter', $js);
    
        $ui->display('wrapper.tpl');
 
        break;
    case 'handle_attachment':

        $uploader = new Uploader();

        if (!file_exists(BANK_STATEMENTS_PATH)) {
            mkdir(BANK_STATEMENTS_PATH, 0777, true);
        }   
             
        $uploader->setDir(BANK_STATEMENTS_PATH);
        $uploader->sameName(false);
        $uploader->setExtensions(array('ofx'));
        $dados = [];
        if($uploader->uploadFile('file')){           
            try{
                $file  = $uploader->getUploadName();
                $ofxParser = new Parser();                
                $ofx = $ofxParser->loadFromFile(BANK_STATEMENTS_PATH . $file);
                $dados = reset($ofx->bankAccounts); 
                $dados->bank = $ofx->signOn->institute->name;
                $d = ORM::for_table('app_conciliation')->create();
                $d->ofx_json_bank_account = json_encode($dados);   
                $d->file_name = $file;   
                $d->save();
                $id = $d->id();

                _log('New Bank Statement Upload: [ID: '.$id.']','Admin',$user['id']);
                
                $ag = str_replace('-', '', $dados->agencyNumber[0]);
                $numConta = $ag .';'. str_replace('-', '', $dados->accountNumber[0]);         
                $date = [$dados->statement->startDate->date, $dados->statement->endDate->date];       
                
                $trans = ORM::for_table('sys_transactions')
                    ->table_alias('t')
                    ->join('sys_accounts', array('a.account', 'LIKE', 't.account'), 'a')
                    ->where_raw('t.date between ? and ?', $date)
                    ->where_like('a.account_number', $numConta)
                    ->where('t.attachments', '')
                    ->select_many('t.id', 't.amount', 't.type', 't.date', 't.description', 't.account', 'a.account_number')
                    ->find_array();

                $ret = [
                    success => true,
                    msg => $_L[upload_success],
                    file => $file,
                    ofx => $dados,
                    transManual => $trans,
                    id=>$id
                ];

            }catch(Exception $e){
                $ret = [success => false, msg => $e->getMessage()];
            }

        }else{
            $ret = [success => false, msg => $uploader->getMessage()];
        }


        header('Content-Type: application/json');

        echo json_encode($ret);   

        break;

    case 'conciliate':
        $id = _post('attachments');
        $conc = json_decode(_post('conciliated'));

        if($id == ''){
           r2(U.'conciliation/init/load/','e','The Bank Statement upload is Required');
        }
        

        $bStat = ORM::for_table('app_conciliation')->where('id', $id)->find_one();
        $ofx = json_decode($bStat['ofx_json_bank_account']);
        $trans = $ofx->statement->transactions;

        $ag = str_replace('-', '', $ofx->agencyNumber->{0});
        $numConta = $ag .';'. str_replace('-', '', $ofx->accountNumber->{0}); 
        $conta = ORM::for_table('sys_accounts')
            ->table_alias('a')
            ->where_like('a.account_number', $numConta)
            ->select_many('a.id', 'a.account', 'a.account_number')
            ->find_one();
           

        foreach ($trans as $key => $value) {            
            if(property_exists($conc, $key)){                
                try{
                    $d = ORM::for_table('sys_transactions')->find_one($conc->{$key});
                    $d->ref = $value->checkNumber->{0};
                    $d->attachments = $id;
                    $d->save(); 
                }catch(Exception $e){
                    exit($e->getMessage());
                }                
            }else{
                try{
                    $data = explode(" ", $value->date->date);
                    $d = ORM::for_table('sys_transactions')->create();
                    $d->account = $conta['account'];   
                    $d->type = $value->amount < 0 ? 'Expense' : 'Income';   
                    $d->dr = $value->amount < 0 ? abs($value->amount) : 0;   
                    $d->cr = $value->amount < 0 ? 0 : abs($value->amount);   
                    $d->amount = abs($value->amount);                  
                    $d->description = $value->memo;   
                    $d->category = 'Uncategorized';   
                    $d->payer = '';   
                    $d->payee = '';   
                    $d->method = '';   
                    $d->tags = '';   
                    $d->updated_at = date("Y-m-d H:i:s");   
                    $d->aid = 0;   
                    $d->date = $data[0];     
                    $d->ref = $value->checkNumber->{0};
                    $d->attachments = $id;     
                    $d->save(); 
                }catch(Exception $e){
                    exit($e->getMessage());
                }               
            }
        }
        r2(U.'conciliation/init/load/','s',$_L[success_conciliate]);
    break;
    default:
        echo 'action not defined';
}
 