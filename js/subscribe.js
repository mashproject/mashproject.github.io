 
$(document).ready(function () {

 $("#btn_subscribe").click(function () {
        var txtEmail = $('#txtSubscribeEmail').val();  
        if (validateEmail(txtEmail)){      
            var ajaxRequest = $.post(
             "js/handlers/subscribe.php" ,{ email: txtEmail },function(data,status){
    alert("Thank you for subscribing.Please check your email to confirm");
             });        
    	}
    	else {
    		alert("Enter a valid email");
    	         }
	});
});
function validateEmail(email){
	var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	var valid = emailReg.test(email);

	if(!valid) {
        return false;
    } else {
    	return true;
    }
}