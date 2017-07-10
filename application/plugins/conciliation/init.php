<?php
 
_auth();
 require "i18n/$config[language].php";

$ui->assign('_application_menu', 'conciliation');
$ui->assign('_title', 'Conciliation'.' - '. $config['CompanyName']);
$ui->assign('_st', 'Conciliation');
$action = $routes['2'];
$user = User::_info();
$ui->assign('user', $user);
define('CONCILIATION_URL', APP_URL.'/application/plugins/conciliation');

 
switch ($action) {
    case 'load':
        $ui->assign('_include','load');
        $ui->assign('_L',$_L);

        $css = Asset::css(array('dropzone/dropzone','modal'));
        $js = Asset::js(array('modal','dropzone/dropzone'));

        $js .= '<script type="text/javascript" src="'.CONCILIATION_URL.'/lib/load.js"></script>';

        $ui->assign('xheader', $css);        
        $ui->assign('xfooter', $js);
    
        $ui->display('wrapper.tpl');
 
        break;
    default:
        echo 'action not defined';
}
 