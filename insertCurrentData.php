
<?php

if(isset($_GET["temperature"])) {
		 $temperature = $_GET["temperature"];
		 $pressure 	= $_GET["pressure"];
		 $humidity 	= $_GET["humidity"];
    
   require_once "connect.php";

   $conn = @new mysqli($servername, $username, $password, $dbname);
   if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
   }

   $sql = "INSERT INTO esp_sensors VALUES (NULL,'$temperature','$pressure','$humidity',now())";

   if ($conn->query($sql) === TRUE) {
      echo "Dodano do bazy o :".date("Y-m-d H:i:s");
   } else {
      echo "Blad: " . $sql . " => " . $conn->error;
   }

   $conn->close();
} 

?>

