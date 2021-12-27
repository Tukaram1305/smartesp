<?php
$var = $_GET["kolor"];
$file = fopen('dane.txt','w');
if (fwrite($file,$var)) echo "Zapisano do dane.txt";
fclose($file);
//if (isset($var))
//{
	echo sprintf("Ustawiłeś kolor: %s </br>",$var);
	echo "<div style='width:200px; height:50px; background-color:$var;'>ssss..</div>";
header("refresh:2; url=send_col_data.php");
//}
//else echo "Cos poszło nie tak!";

?>