<!DOCTYPE HTML5>
<?php 
$cookie_name = "LED_C";
$cookie_value = "#DD2243";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
?>
<html>
<head>
<title>Strona główna</title>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="styl.css?ts=<?=time()?>" />
<link rel="stylesheet" type="text/css" href="controls.css?ts=<?=time()?>" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Gelasio:wght@600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Days+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Sarpanch:wght@800&display=swap" rel="stylesheet">


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<?php
// pobranie przedzialow dla elementow daty
require_once "connect.php";
$conn = @new mysqli($servername, $username, $password, $dbname);
// połaczenie nie powiodło się
if ($conn->connect_errno!=0)
{
	echo '<p style="color:red;font-size:24px;">Błąd nr: '.$conn->connect_errno. '<br/> Opis: '.$conn->connect_error.'</p>';
	exit();
}
// połączenie powiodło się
else
{
 $result = mysqli_query($conn,sprintf("SELECT MIN(Timestamp) AS date_time FROM esp_sensors"));
 $minDate = mysqli_fetch_assoc($result);
 $result = mysqli_query($conn,sprintf("SELECT MAX(Timestamp) AS date_time FROM esp_sensors"));
 $maxDate = mysqli_fetch_assoc($result);
 // konwersja z date_time(string) na obiekt date(int)
 $MIND = strtotime($minDate['date_time']);
 $MAXD = strtotime($maxDate['date_time']);
 // konwersja na format Y-m-d
 $minKnownFormDate = date('Y-m-d',$MIND);
 $maxKnownFormDate = date('Y-m-d',$MAXD);
//echo "Min date: ".$minKnownFormDate."  / Max date: ".$maxDate['date_time'];
 $conn->close();
}
?>

<body>
<header>
<div class="parent">
	<div id="h_bg"><img src="img/BG4.png"/></div>
		<div id="fringle1"></div>
		<div id="fringle2"></div>
			<div id="h_title">
			Platforma Smart Home
			</div>
</div>

</header>

<div id="INFOBAR">
		<span>ADRES BAZY::</span>
		<span><input id="esp_ip" class="ip_input" type="text" name="ip1" value="192.168.1.35"></span>
		<span id="konsola">--- LOG ---</span>
	</div>
	

<div class="parent">
<div id="sidenav" >
<span class="vtext" onclick="zwin()"></span>
<a href="index.php"><div class="menu_elem">Strona główna</div></a>
<a href="temperature.php"><div class="menu_elem"> > Temperatura</div></a>
<a href="humidity.php"><div class="menu_elem"> > Wilgotność powietrza</div></a>
<a href="pressure.php"><div class="menu_elem"> > Ciśnienie atmosferyczne</div></a>
<a href="charts.php"><div class="menu_elem">Prezentacja klasy wykresów</div></a>
<a href="alexa.php"><div class="menu_elem">ALEXA</div></a>
<a href="http://192.168.1.36"><div class="menu_elem">WS28 LED</div></a>

<div id="fx1" >MENU</div>
</div>
</div>



<div id="content">
<canvas id="BGCAN"></canvas>
<div class="roomContainer">
<div class="elem_head">Częstotliwość zbierania danych</div>
	<div class="roomSubContainer">
		<div class="elem">
			<div class="elem_head">Ustawiona</div>
			<div><img src="icons/refresh.png" height="100%" width="80" alt="Ref"></div><br>
			<div id="refFreqHolder" class="VALL_DISP">...</div>
		</div>

		<div class="elem">
			<div class="elem_head">Nowa</div>
			<div><img src="icons/refNew.png" height="100%" width="80" alt="Ref"></div><br>
			<div><input class="numInputVal1" type="number" min="1" step="1" value="" id="refFreq" onchange="getSendRefFrequency('1')"> Min.</div>
		</div>

	</div>
</div>

<div class="roomContainer">
<div class="elem_head">3x LED</div>
<div class="roomSubContainer">
		<!-- OSWIETLENIE -->
		<div class="elem">
		<div class="elem_head">Taśma LED #1</div>
			<div class="parent">
				<div class="LED_BG" id="LEDs1_bg"></div>
				<div class="LED_FG" style="padding:5px;"><img src="img/LEDc1.png" width="80px" height="auto"/></div>
			</div>
			<div id="LEDs1_val" class="VALL_MINOR_TXT">Wył.</div>
		<input id="LEDs1_inp" name="LEDs1_inp" style="width:140px; height:40px;" type="color" value="#000000" oninput="updateLED('LEDs1')">
		<button type="button" class="btn2" value="#000000" onclick="LEDsOFF('LEDs1')">Wyłącz</buttom>
		</div>
		<!-- OSWIETLENIE -->
		<div class="elem">
		<div class="elem_head">Taśma LED #2</div>
			<div class="parent">
				<div class="LED_BG" id="LEDs2_bg"></div>
				<div class="LED_FG" style="padding:5px;"><img src="img/LEDc2.png" width="80px" height="auto"/></div>
			</div>
			<div id="LEDs2_val" class="VALL_MINOR_TXT">Wył.</div>
		<input id="LEDs2_inp" name="LEDs1_inp" style="width:140px; height:40px;" type="color" value="#000000" oninput="updateLED('LEDs2')">
		<button type="button" class="btn2" value="#000000" onclick="LEDsOFF('LEDs2')">Wyłącz</buttom>
		</div>
		<!-- OSWIETLENIE -->
		<div class="elem">
		<div class="elem_head">Taśma LED #3</div>
			<div class="parent">
				<div class="LED_BG" id="LEDs3_bg"></div>
				<div class="LED_FG" style="padding:5px;"><img src="img/LEDc3.png" width="80px" height="auto"/></div>
			</div>
			<div id="LEDs3_val" class="VALL_MINOR_TXT">Wył.</div>
		<input id="LEDs3_inp" name="LEDs1_inp" style="width:140px; height:40px;" type="color" value="#000000" oninput="updateLED('LEDs3')">
		<button type="button" class="btn2" value="#000000" onclick="LEDsOFF('LEDs3')">Wyłącz</buttom>
		</div>
</div>
</div>

<div class="roomContainer">
<div class="elem_head">Salon</div>
<div class="subNote" id="dataTakenTimestamp"></div>

	<div class="roomSubContainer">
		<div class="elem">
			<div class="elem_head">Temperatura</div>
			<div><img src="icons/TEMP.png" height="100%" width="80" alt="Temperatura"></div><br>
			<div id="tempholder" class="VALL_DISP">...</div>
		</div>

		<div class="elem">
			<div class="elem_head">Wilgotność</div>
			<div><img src="icons/HUM.png" height="100%" width="80" alt="Wilgotność"></div><br>
			<div id="humholder" class="VALL_DISP">...</div>
		</div>

		<div class="elem">
			<div class="elem_head">Ciśnienie</div>
			<div><img src="icons/PRESS.png" height="100%" width="80" alt="Ciśnienie"></div><br>
			<div id="pressholder" class="VALL_DISP">...</div>
		</div>
		<!-- OSWIETLENIE -->
		<div class="elem">
		<div class="elem_head">Taśma LED</div>
			<div class="parent">
				<div class="LED_BG" id="LED1_bg"></div>
				<div class="LED_FG" style="padding:5px;"><img src="img/LED2.png" width="100px" height="auto"/></div>
			</div>
			<div id="LED1_val" class="VALL_MINOR_TXT">Wył.</div>
		<input id="LED1_inp" name="LED1_inp" style="width:140px; height:40px;" type="color" value="<?php echo $_COOKIE[$cookie_name];?>" oninput="updateLED('LED1')">
		</div>
	</div>
</div>

<div class="roomContainer">
<div class="elem_head">Jadalnia</div>
<div class="subNote" id="dataTakenTimestamp2"></div>

	<div class="roomSubContainer">
		<div class="elem">
			<div class="elem_head">ESP WiFi RSSI</div>
			<div><img src="icons/remotetemp.png" height="100%" width="80" alt="RSSI"></div><br>
			<div id="rssiholder" class="VALL_DISP">+/-RSSI</div>
		</div>

		<div class="elem">
			<div class="elem_head">Wilgotność</div>
			<div><img src="icons/HUM.png" height="100%" width="80" alt="Wilgotność"></div><br>
			<div id="arr" class="VALL_DISP">...</div>
		</div>
		<div class="elem">
			<div class="elem_head">Światło #1</div>
			<div class="parent">
				<div class="LED_BG" id="LED2_bg"></div>
				<div class="LED_FG" style="padding:5px;"><img src="img/LED1.png" width="100px" height="auto"/></div>
			</div>
			<div id="LED2_val" class="VALL_MINOR_TXT">Wył.</div>
		<input id="LED2_inp" name="LED2_inp" style="width:140px; height:40px;" type="color" value="#FFCC00" oninput="updateLED('LED2')">
		</div>
		<div class="elem">
		<div class="elem_head">Urządzenie #1</div>
			<div class="LED_FG" style="padding:5px;"><img src="icons/RELAY.png" width="50px" height="auto"/></div><br>
			<label class="switch">
			<input name="input1" id="chk1" type="checkbox" value="RELAY_1" onchange="sendSwitch()">
			<span class="sliderTGL round"></span>
			</label> 
			<div class="VALL_DISP" id="chkbox1">OFF</div>
		</div>
	</div>
</div>

</div>

<canvas id="BG" width="1400px" height="500px" style="border:0px solid #ff2222;"></canvas>


<footer>
	<?php echo "Markowiak Paweł &copy ".date("Y-m-d");?>
</footer>
</body>

<script src="globalScript.js?ts=<?=time()?>">	</script>

<script>
getSendRefFrequency()
//BGFX_CREATE()
</script>

</html>

