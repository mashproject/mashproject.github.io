$(document).ready(function () {

 $("#btn_subscribe").click(function () {
        var txtEmail = $('#txtSubscribeEmail').val();  
        var 
        if (validateEmail(txtEmail)){      
            var ajaxRequest = $.post(
             "http://52.74.102.84:4000/redspot" ,{ email: txtEmail,  },function(data,status){
    alert("Thank you for subscribing.Please check your email to confirm");
             });        
    	}
    	else {
    		alert("Enter a valid email");
    	         }
	});
});
