<?php
// For user to logout.
    session_start();
    session_destroy();
    echo json_encode(array(
  		"success" => true
  	));
    exit;
?>
