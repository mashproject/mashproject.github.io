$(document).ready(function () {
    init_SubscribeFormValidator();

    $("#btn_subscribe").click(function () {
        var txtEmail = $('#txtSubscribeEmail');
        if ($('#frm_subscribe').valid()) {
            var ajaxRequest = $.ajax({
                url: 'handlers/subscribe.php',
                type: "POST",
                data: { email: txtEmail.val() },
                beforeSend: function () {
                    $("#btn_subscribe").button('loading');
                }
            });

            ajaxRequest.fail(function (data) {
                // error
                var $message = '<i class="fa fa-times-circle"></i> ' + data.responseText;
                $("#subscribe_form_message").addClass("alert alert-danger");
                $("#subscribe_form_message").html($message);
                $("#btn_subscribe").button('reset');
            });

            ajaxRequest.done(function (response) {
                // done
                var $message = '<i class="fa fa-check-circle"></i> ' + response;
                $("#subscribe_form_message").addClass("alert alert-success");
                $("#subscribe_form_message").html($message);
            });

            ajaxRequest.always(function () {
                // complete
                $("#btn_subscribe").button('reset');
                $("#frm_subscribe")[0].reset();
            });
        }
    });
});

function init_SubscribeFormValidator() {
    $('#frm_subscribe').validate({
        messages: {
            txtSubscribeEmail: {
                required: '<i class="icon-remove-sign"></i> required.',
                email: '<i class="icon-info-sign"></i> invalid.</b>'
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
            $('<div class="clearfix"></div>').insertBefore(error);
            $('<div class="clearfix"></div>').insertAfter(error);
            error.css({ left: element.position().left + (element.width() - error.width()), top: element.position().top - 7, position: 'absolute', 'z-index': 900 });
        },
        invalidHandler: function (event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {
            } else {
            }
        }
    });
}