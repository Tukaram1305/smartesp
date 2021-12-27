
<?php

if(isset($_GET["temperature"])) {
   $temperature = $_GET["temperature"];
   $pressure 	= $_GET["pressure"];
   $humidity 	= $_GET["humidity"];
   
   
$array = Array (
"temp"=>(float)$temperature,
"hum"=>(float)$humidity , 
"press"=>(float)$pressure
//"press"=>rand(980,999)
);

// encode array to json
$json = json_encode(array('data' => $array));

//write json to file
if (file_put_contents("czujniki.txt", $json))
{echo "Utworzylem/nadpisalem plik";
header("refresh:1,url=index.php");}

else 
    echo "Cos poszlo nie tak z tworzeniem pliku!";
}
?>

