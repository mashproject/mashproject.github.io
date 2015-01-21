 
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
    var emailReg = new RegExp(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
	var valid = emailReg.test(email);

	if(!valid) {
        return false;
    } else {
    	return true;
    }
}