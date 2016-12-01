<?php
// login_ajax.php

// header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
require 'Database.php';
$user = $_POST['username'];
$pwd_guess = $_POST['password'];
//Use a prepared statement
$stmt = $mysqli->prepare("SELECT COUNT(*), username, cpassword FROM users WHERE username=?");

// Bind the parameter
$stmt->bind_param('s', $user);
$stmt->execute();
// Bind the results
$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

if($cnt == 1 && crypt($pwd_guess, $pwd_hash)==$pwd_hash){
	ini_set("session.cookie_httponly", 1);
	session_start();
	$_SESSION['username'] = $user;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);

	echo json_encode(array(
		"success" => true,
		"username" => $_SESSION['username'],
		"token" => $_SESSION['token']
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>
