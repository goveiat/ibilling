<div class="row">

    <div class="col-md-12">

        <div class="panel panel-default">
            <div class="panel-body">

                <form class="form-horizontal" action="{$_url}conciliation/init/conciliate/" method="post">


                    <div class="form-group">
                        <label for="description" class="col-sm-2 control-label">{$_L['p_concil_bank_statement']}</label>
                        <div class="col-sm-9">
                            <div class="help-block">
                            <a data-toggle="modal" href="#modal_add_item">
                                <i class="fa fa-paperclip"></i> 
                                {$_L['Attach File']}
                            </a> 
                            <span id="uploaded"></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description" class="col-sm-2 control-label">{$_L['p_concil_conciliation']}</label>
                        <div class="col-sm-9">
                            <div class="help-block" id="emptyOfx">{$_L['p_concil_empty_ofx']}</div>
                            <div id="transacoes"></div>
                        </div>
                    </div>                        

                   


                    <div class="form-group">
                        <div class="col-sm-offset-6 col-sm-10">
                            <input type="hidden" name="attachments" id="attachments" value="">
                            <input type="hidden" name="conciliated" id="conciliated" value="">
                            <button type="submit" id="submit" class="btn btn-primary"><i class="fa fa-check"></i> {$_L['Submit']}</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
<div id="modal_add_item" class="modal fade-scale" tabindex="-1" data-width="600" style="display: none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">{$_L['Attach File']}</h4>
    </div>
    <div class="modal-body">
        <div class="row">



            <div class="col-md-12">
                <form action="" class="dropzone" id="upload_container">

                    <div class="dz-message">
                        <h3> <i class="fa fa-cloud-upload"></i>  {$_L['Drop File Here']}</h3>
                        <br />
                        <span class="note">{$_L['Click to Upload']}</span>
                    </div>

                </form>


            </div>




        </div>
    </div>
    <div class="modal-footer">

        <button type="button" data-dismiss="modal" class="btn btn-danger">Close</button>

    </div>
</div>

</div>