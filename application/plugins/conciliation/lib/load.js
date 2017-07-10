Dropzone.autoDiscover = false;
$(document).ready(function () {

    $("#emsg").hide();

    var _url = $("#_url").val();

    var upload_resp;

    var $ib_form_submit = $("#submit");



    var ib_file = new Dropzone("#upload_container",
        {
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

        console.log(file,response)

        upload_resp = response;

        if(upload_resp.success){

            toastr.success(upload_resp.msg);

            $('#attachments').val(function(i,val) {
                return val + (!val ? '' : ',') + upload_resp.file;
            });

            $('#uploaded').text(function(i,val) {
                return val + (!val ? '' : ',') + file.name;
            });            


        }
        else{
            toastr.error(upload_resp.msg);
        }



    });


 
});