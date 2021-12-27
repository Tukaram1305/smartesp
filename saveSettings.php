<?php
//$f = fopen("savedSettings.json","w");
//fwrite($f,json_decode($_POST["sJson"]));
file_put_contents("savedSettings.json",$_POST['sJson'],LOCK_EX);
echo $_POST['sJson'];


?>