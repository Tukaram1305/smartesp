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


<body>
<header>
<div class="parent">
	<div id="h_bg"><img src="img/BG4.png"/></div>
			<div id="h_title">
			ALEXA
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


<div id="fx1" >MENU</div>
</div>
</div>



<div id="content">

<div class="roomContainer">
		<div class="roomSubContainer">
				<div class="elem">
					<input type="text" value="1" id="aval1"><label for="aval1">Value 1</label>
					<input type="text" value="2" id="aval2"><label for="aval2">Value 2</label>
					<input type="text" value="3" id="aval3"><label for="aval3">Value 3</label>
					<button type="button" class="btn2" id="sendSheet" onclick="sendToSheet()">Send to sheet</button>
				</div>
		</div>
</div>

<script>
function sendToSheet()
{
	const sAddr = "https://script.google.com/macros/s/"
	const sID = "AKfycbwSGmrF5b_hRVNb6EzyoCnl67FSdkKTzPyhsKpekljwjkFUKzA"
	const sAddrEnd = "/exec?"
	const sfullAddr = sAddr+sID+sAddrEnd
	console.log("Sheet Addr: "+sfullAddr)

	var xhr = new XMLHttpRequest();
	var aVal1 = document.getElementById("aval1").value
	var aVal2 = document.getElementById("aval2").value
	var aVal3 = document.getElementById("aval3").value

	var rBody = "value1="+aVal1+"&value2="+aVal2+"&value3="+aVal3
	console.log("Sheet body: "+rBody)

	var data = {email: "email@address.com"}

$.ajax({
  url: sfullAddr+rBody,
  type: "GET",
  data: null,
  contentType: "application/javascript",
  dataType: 'jsonp'
})
.done(function(res) {
  console.log('success')
})
.fail(function(e) {
  console.log("error")
});

window.receipt = function(res) {
  // this function will execute upon finish
}

		}
</script>

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



<footer>
	<?php echo "Markowiak Paweł &copy ".date("Y-m-d");?>
</footer>
</body>

<script src="globalScript.js?ts=<?=time()?>">	</script>

<script>
getSendRefFrequency()
</script>

</html>

