<?PHP
// Connect to a database.
$mysqli = new mysqli('localhost', 'root', 'rootsql', 'Creative');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>
