<?php
require_once("MailChimp.class.php");
$email = $_POST['email'];
$MailChimp = new MailChimp('664764f7e92f445f582e24a25263e8ad-us9');
$result = $MailChimp->call('lists/subscribe', array(
                'id'                => 'f60763a1d5',
                'email'             => array('email'=>$email),
                'double_optin'      => false,
                'update_existing'   => true,
                'replace_interests' => false,
                'send_welcome'      => false,
            ));

$data = json_decode($result);

if ($data->error){
    echo $data->error;
	throw new Exception();
} else {
    echo "Got it, you've been added to our email list.";
}
?>