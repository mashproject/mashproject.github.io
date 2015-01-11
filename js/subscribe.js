 
$(document).ready(function () {

 $("#btn_subscribe").click(function () {
        var txtEmail = $('#txtSubscribeEmail').val();        
            var ajaxRequest = $.post(
             "js/handlers/subscribe.php" ,{ email: txtEmail },function(data,status){
    alert("Thank You for subscribing");
             });        
    });
});