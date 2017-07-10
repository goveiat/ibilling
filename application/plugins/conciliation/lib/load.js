Dropzone.autoDiscover = false;

$(document).ready(function () {

    var upload_resp;

    var $ib_form_submit = $("#submit");


    var ib_file = new Dropzone("#upload_container",
        {
            url: _url + "conciliation/handle_attachment/",
            maxFiles: 1,
            acceptedFiles: ".txt, .ofx"
        }
    );


    ib_file.on("sending", function() {

        $ib_form_submit.prop('disabled', true);

    });

    ib_file.on("success", function(file,response) {

        $ib_form_submit.prop('disabled', false);

        upload_resp = response;

        if(upload_resp.success == 'Yes'){

            toastr.success(upload_resp.msg);
            // $file_link.val(upload_resp.file);
            // files.push(upload_resp.file);
            //
            // console.log(files);

            $('#attachments').val(function(i,val) {
                return val + (!val ? '' : ',') + upload_resp.file;
            });


        }
        else{
            toastr.error(upload_resp.msg);
        }







    });

});