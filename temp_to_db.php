
<?php

if(isset($_GET["temperature"])) {
   $temperature = $_GET["temperature"]; // get temperature value from HTTP GET
 $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "db_esp32";

   // Create connection
   $conn = new mysqli($servername, $username, $password, $dbname);
   // Check connection
   if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
   }

   $sql = "INSERT INTO tbl_temp VALUES (NULL,'$temperature',now())";

   if ($conn->query($sql) === TRUE) {
      echo "Dodano temp do bazy o :".date("Y-m-d H:i:s");
   } else {
      echo "Error: " . $sql . " => " . $conn->error;
   }

   $conn->close();
} else {
   echo "temperature is not set";
}?>