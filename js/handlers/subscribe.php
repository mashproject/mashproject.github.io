<?php
header("Access-Control-Allow-Origin: *");
//prints the $_POST array.
printArray($_POST);

function printArray($array){
     foreach ($array as $key => $value){
        echo "$key => $value";
        if(is_array($value)){ //If $value is an array, print it as well!
            printArray($value);
        }  
    } 
}

$api_key = "";
$list_id = "";

require('src/Mailchimp.php');
$Mailchimp = new Mailchimp($api_key);


$subscriber = $Mailchimp->lists->subscribe($list_id, array('email' => $_POST['email']));
//this is working // $subscriber = $Mailchimp->lists->subscribe($list_id, array('email' => 'hemant6488@gmail.com'));

if ( ! empty($subscriber['leid'])) {
    // Success
    echo "Email added successfully.";
}

?>



