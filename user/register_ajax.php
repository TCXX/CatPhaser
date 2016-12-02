<?PHP
// For new user to sign up.
require 'Database.php';

$username = $mysqli->real_escape_string($_POST['username']);
$password = $_POST['password'];

$stmt1 = $mysqli->prepare("SELECT username FROM users WHERE username=?");
if(!$stmt1){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt1->bind_param('s', $username);
$stmt1->execute();
$stmt1->bind_result($nameExists);
$stmt1->fetch();
$stmt1->close();

if ($username == $nameExists) {
	echo json_encode(array(
		"success" => false,
		"message" => "The username exists."
	));
	exit;
}

$stmt = $mysqli->prepare("INSERT INTO users (username, cpassword) values (?, ?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
// Encrypt password
$password = crypt($password);
//echo $password;
$stmt->bind_param('ss', $username, $password);
$stmt->execute();
$stmt->close();

// Set the score of the new user 0 in the database initially.
$stmt2 = $mysqli->prepare("INSERT INTO userScores(username, score) values (?,0)");
if(!$stmt2){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt2->bind_param('s', $username);

$stmt2->execute();

$stmt2->close();

session_start();
ini_set("session.cookie_httponly", 1);
$_SESSION['username'] = $username;
$_SESSION['token'] = substr(md5(rand()), 0, 10);
echo json_encode(array(
	"success" => true,
	"username" => $_SESSION['username'],
	"token" => $_SESSION['token']
));
exit;
?>
