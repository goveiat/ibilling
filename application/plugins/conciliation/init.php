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
            $file  = $uploader->getUploadName(); 

            $ofxParser = new Parser();
            try{
                $ofx = $ofxParser->loadFromFile(BANK_STATEMENTS_PATH . $file);
                $dados = reset($ofx->bankAccounts);  
                $d = ORM::for_table('app_conciliation')->create();
                $d->ofx_json_bank_account = json_encode($dados);   
                $d->save();
                $tid = $d->id();
                _log('New Bank Statement Upload: [TrID: '.$tid.']','Admin',$user['id']);
                // _msglog('s',$_L['Transaction Added Successfully']);
                $trans = ORM::for_table('sys_transactions')->where_raw('`date` between ? and ?', [$dados->statement->startDate->date, $dados->statement->endDate->date])->find_array();
            }catch(Exception $e){
                $dados = $e->getMessage();
            }
             

            $msg = $_L[upload_success];
            $success = true;
        }else{
            $file = '';
            $msg = $uploader->getMessage();
            $success = false;
        }

        $ret = [
            success => $success,
            msg => $msg,
            file => $file,
            dados => $dados,
            path => $trans
        ];

        header('Content-Type: application/json');

        echo json_encode($ret);   

        break;
    default:
        echo 'action not defined';
}
 