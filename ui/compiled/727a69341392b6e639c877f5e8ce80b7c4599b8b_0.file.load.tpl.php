<?php
/* Smarty version 3.1.30, created on 2017-07-10 14:42:01
  from "/var/www/html/ibilling/application/plugins/conciliation/views/load.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5963ca79c3cce4_90959655',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '727a69341392b6e639c877f5e8ce80b7c4599b8b' => 
    array (
      0 => '/var/www/html/ibilling/application/plugins/conciliation/views/load.tpl',
      1 => 1499712120,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5963ca79c3cce4_90959655 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="row">

    <div class="col-md-12">

        <div class="panel panel-default">
            <div class="panel-body">

                <form class="form-horizontal" action="<?php echo $_smarty_tpl->tpl_vars['_url']->value;?>
conciliation/init/load_bank_statement/" method="post">


                    <div class="form-group">
                        <label for="description" class="col-sm-3 control-label"><?php echo $_smarty_tpl->tpl_vars['_L']->value['Bank_Statement'];?>
</label>
                        <div class="col-sm-9">
                            <div class="help-block">
                            <a data-toggle="modal" href="#modal_add_item">
                                <i class="fa fa-paperclip"></i> 
                                <?php echo $_smarty_tpl->tpl_vars['_L']->value['Attach File'];?>

                            </a> 
                            </div>
                        </div>
                    </div>                    


                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <button class="btn btn-primary" type="submit" id="submit">
                            <i class="fa fa-check"></i> <?php echo $_smarty_tpl->tpl_vars['_L']->value['Submit'];?>

                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
<div id="modal_add_item" class="modal fade-scale" tabindex="-1" data-width="600" style="display: none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title"><?php echo $_smarty_tpl->tpl_vars['_L']->value['Attach File'];?>
</h4>
    </div>
    <div class="modal-body">
        <div class="row">



            <div class="col-md-12">
                <form action="" class="dropzone" id="upload_container">

                    <div class="dz-message">
                        <h3> <i class="fa fa-cloud-upload"></i>  <?php echo $_smarty_tpl->tpl_vars['_L']->value['Drop File Here'];?>
</h3>
                        <br />
                        <span class="note"><?php echo $_smarty_tpl->tpl_vars['_L']->value['Click to Upload'];?>
</span>
                    </div>

                </form>


            </div>




        </div>
    </div>
    <div class="modal-footer">

        <button type="button" data-dismiss="modal" class="btn btn-danger">Close</button>

    </div>
</div>

</div><?php }
}