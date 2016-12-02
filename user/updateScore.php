<?php
require 'Database.php';
$user = $_POST['username'];
$gameHighest = $_POST['gameHighest'];

$stmt = $mysqli->prepare("UPDATE userScores SET score=? WHERE username=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('is', $gameHighest, $user);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true,
  "gameHighest" => $gameHighest
));
exit;
?>
