<?php
$dane = file_get_contents("dane.txt");

echo "Odczytalem: $dane";

header("refresh:1; url=index.php");


?>