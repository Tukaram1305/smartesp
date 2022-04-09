<?php
   // Glowny skypt php z zapytaniami do bazy SQL i zwracajacy informacje do tabel
	require_once "connect.php";
   $conn = @new mysqli($servername, $username, $password, $dbname);
   if ($conn->connect_error) {
      die("Błąd połączenia: " . $conn->connect_error);
   }
   else {
      $arr = Array (
         "minHour"=>0.0,
         "maxHour"=>0.0,
         "avgHour"=>0.0,
         "HourNums"=>0,
         "minDay"=>0.0,
         "maxDay"=>0.0,
         "avgDay"=>0.0,
         "DayNums"=>0,
         "minWeek"=>0.0,
         "maxWeek"=>0.0,
         "avgWeek"=>0.0,
         "WeekNums"=>0,
         "minMonth"=>0.0,
         "maxMonth"=>0.0,
         "avgMonth"=>0.0,
         "MonthNums"=>0
      );
	if (isset($_POST['sensorType']))
	{
      $whatData = $_POST['sensorType'];

   //godzina
   $sql = mysqli_query($conn,sprintf("SELECT COUNT(%s) AS 'ILE' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 HOUR)",$whatData));
   $arr["HourNums"]=mysqli_fetch_assoc($sql);
   if ($arr['HourNums']['ILE']>0)
   {
      $sql = mysqli_query($conn,sprintf("SELECT TRUNCATE(AVG(%s),2) AS 'AVG' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 HOUR)",$whatData));
      $arr["avgHour"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MIN',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 HOUR) ORDER BY %s ASC LIMIT 1",$whatData,$whatData));
      $arr["minHour"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MAX',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 HOUR) ORDER BY %s DESC LIMIT 1",$whatData,$whatData));
      $arr["maxHour"]=mysqli_fetch_assoc($sql);
    
      if ($arr["minHour"]!=NULL) $arr["minHour"]["TS"] = date("H:i:s",strtotime($arr["minHour"]["TS"]));
      if ($arr["maxHour"]!=NULL) $arr["maxHour"]["TS"] = date("H:i:s",strtotime($arr["maxHour"]["TS"]));
   }  
   else 
   {
      $arr['avgHour'] = array("AVG"=>0);
      $arr['minHour'] = array("MIN"=>0,"TS"=>"BRAK DANYCH");
      $arr['maxHour'] = array("MAX"=>0,"TS"=>"BRAK DANYCH");
   }

   //dzien
   $sql = mysqli_query($conn,sprintf("SELECT COUNT(%s) AS 'ILE' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 DAY)",$whatData));
   $arr["DayNums"]=mysqli_fetch_assoc($sql);
   if ($arr['DayNums']['ILE']>0)
   {
      $sql = mysqli_query($conn,sprintf("SELECT TRUNCATE(AVG(%s),2) AS 'AVG' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 DAY)",$whatData));
      $arr["avgDay"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MIN',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 DAY) ORDER BY %s ASC LIMIT 1",$whatData,$whatData));
      $arr["minDay"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MAX',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 DAY) ORDER BY %s DESC LIMIT 1",$whatData,$whatData));
      $arr["maxDay"]=mysqli_fetch_assoc($sql);

      $arr['minDay']['TS']=date("H:i d/m",strtotime($arr['minDay']['TS']));
      $arr['maxDay']['TS']=date("H:i d/m",strtotime($arr['maxDay']['TS']));
   }
   else 
   {
      $arr['avgDay'] = array("AVG"=>0);
      $arr['minDay'] = array("MIN"=>0,"TS"=>"BRAK DANYCH");
      $arr['maxDay'] = array("MAX"=>0,"TS"=>"BRAK DANYCH");
   }
   
   //tydzien
   $sql = mysqli_query($conn,sprintf("SELECT COUNT(%s) AS 'ILE' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 WEEK)",$whatData));
   $arr["WeekNums"]=mysqli_fetch_assoc($sql);
   if ($arr['WeekNums']['ILE']>0)
   {
      $sql = mysqli_query($conn,sprintf("SELECT TRUNCATE(AVG(%s),2) AS 'AVG' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 WEEK)",$whatData));
      $arr["avgWeek"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MIN',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 WEEK) ORDER BY %s ASC LIMIT 1",$whatData,$whatData));
      $arr["minWeek"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MAX',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 WEEK) ORDER BY %s DESC LIMIT 1",$whatData,$whatData));
      $arr["maxWeek"]=mysqli_fetch_assoc($sql);

      $arr['minWeek']['TS']=date("H:i d/m",strtotime($arr['minWeek']['TS']));
      $arr['maxWeek']['TS']=date("H:i d/m",strtotime($arr['maxWeek']['TS']));
   }
   else 
   {
      $arr['avgWeek'] = array("AVG"=>0);
      $arr['minWeek'] = array("MIN"=>0,"TS"=>"BRAK DANYCH");
      $arr['maxWeek'] = array("MAX"=>0,"TS"=>"BRAK DANYCH");
   }

   //miesiac
   $sql = mysqli_query($conn,sprintf("SELECT COUNT(%s) AS 'ILE' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 MONTH)",$whatData));
   $arr["MonthNums"]=mysqli_fetch_assoc($sql);
   if ($arr['MonthNums']['ILE']>0)
   {
      $sql = mysqli_query($conn,sprintf("SELECT TRUNCATE(AVG(%s),2) AS 'AVG' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 MONTH)",$whatData));
      $arr["avgMonth"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MIN',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 MONTH) ORDER BY %s ASC LIMIT 1",$whatData,$whatData));
      $arr["minMonth"]=mysqli_fetch_assoc($sql);
      $sql = mysqli_query($conn,sprintf("SELECT %s AS 'MAX',Timestamp AS 'TS' FROM esp_sensors WHERE Timestamp >= DATE_SUB(NOW(),INTERVAL 1 MONTH) ORDER BY %s DESC LIMIT 1",$whatData,$whatData));
      $arr["maxMonth"]=mysqli_fetch_assoc($sql);

      $arr['minMonth']['TS']=date("H:i d/m/y",strtotime($arr['minMonth']['TS']));
      $arr['maxMonth']['TS']=date("H:i d/m/y",strtotime($arr['maxMonth']['TS']));
   }
   else 
   {
      $arr['avgMonth'] = array("AVG"=>0);
      $arr['minMonth'] = array("MIN"=>0,"TS"=>"BRAK DANYCH");
      $arr['maxMonth'] = array("MAX"=>0,"TS"=>"BRAK DANYCH");
   }

   mysqli_free_result($sql);
	$iJSON = json_encode($arr);
   header('Content-Type: application/json; charset=utf-8');
	echo $iJSON;
   }
   $conn->close();
   }
?>