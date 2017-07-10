<?php
/* Smarty version 3.1.30, created on 2017-07-10 12:40:46
  from "/var/www/html/ibilling/application/plugins/notes/views/add.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5963ae0eeed185_43197411',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8d65d3ab2b2011330e3d4d5583fbdbd5d9d93ba0' => 
    array (
      0 => '/var/www/html/ibilling/application/plugins/notes/views/add.tpl',
      1 => 1479237726,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5963ae0eeed185_43197411 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div class="row">

    <div class="col-md-12">

        <div class="panel panel-default">
            <div class="panel-body">

                <form class="form-horizontal" action="<?php echo $_smarty_tpl->tpl_vars['_url']->value;?>
notes/init/add_post/" method="post">

                    <div class="form-group"><label class="col-lg-2 control-label">Title </label>

                        <div class="col-lg-10"><input type="text" name="title" class="form-control">

                        </div>
                    </div>


                    <div class="form-group"><label class="col-lg-2 control-label">Contents </label>

                        <div class="col-lg-10">

                            <textarea class="form-control" name="contents" rows="15"></textarea>

                        </div>
                    </div>


                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <button class="btn btn-primary" type="submit" id="submit"><i
                                        class="fa fa-check"></i> <?php echo $_smarty_tpl->tpl_vars['_L']->value['Submit'];?>
</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>


</div><?php }
}
