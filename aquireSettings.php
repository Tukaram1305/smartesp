<?php
//$f = fopen("savedSettings.json","w");
//fwrite($f,json_decode($_POST["sJson"]));
$setJson = file_get_contents("savedSettings.json");
echo $setJson;


?>