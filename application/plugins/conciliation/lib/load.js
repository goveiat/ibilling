Dropzone.autoDiscover = false;
$(document).ready(function () {

    $("#emsg").hide();

    var _url = $("#_url").val();

    var response;

    var $ib_form_submit = $("#submit");



    var ib_file = new Dropzone("#upload_container", {
            url: _url + "conciliation/init/handle_attachment/",
            maxFiles: 1,
            acceptedFiles: ".ofx"
        }
    );


    ib_file.on("sending", function() {
        $ib_form_submit.prop('disabled', true);
    });



    ib_file.on("success", function(file,response) {

        $ib_form_submit.prop('disabled', false);

        console.log(response)

        if(response.success){
            $("#emptyOfx").css('display', 'none');
            toastr.success(response.msg);

            ReactDOM.render(
              React.createElement(ListaConciliacao, {
                ofx: response.ofx, 
                transManual: response.transManual
              }, null),
              document.getElementById('transacoes')
            );            

            $('#attachments').val(function(i,val) {
                return val + (!val ? '' : ',') + response.file;
            });

            $('#uploaded').text(function(i,val) {
                return val + (!val ? '' : ',') + file.name;
            });            
        }
        else{
            toastr.error(response.msg);
        }



    });


 
});


