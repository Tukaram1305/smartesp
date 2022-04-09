<?php
require_once "connect.php";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}
else {
	$sql = mysqli_query($conn,"SELECT *,DATE_FORMAT(NOW(),'%k:%i:%s (%d/%c/%y)') AS TS FROM esp_sensors ORDER BY Timestamp DESC LIMIT 1 ");
    $row = mysqli_fetch_assoc($sql);
    $row['Timestamp']=date("H:i:s (d/m/y)",strtotime($row['Timestamp']));
    $jsonstr = json_encode($row);
    echo $jsonstr;
}

?>