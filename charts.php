<!DOCTYPE HTML5>
<html>
<head>
<title>Wykresy</title>
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
			Platforma Smart Home
			</div>
</div>

</header>

	<div id="INFOBAR">
		<span>INFO: ESP IP:</span>
		<span><input id="esp_ip" class="ip_input" type="text" name="ip1" value="192.168.1.35"></span>
		<span id="current_ip">ip</span>
		<span id="konsola">--- LOG/KONSOLA ---</span>
	</div>
	

<div class="parent">
<div id="sidenav" >
<span class="vtext" onclick="zwin()"></span>
<a href="index.php"><div class="menu_elem">Strona główna</div></a>
<a href="temperature.php"><div class="menu_elem"> > Temperatura</div></a>
<a href="humidity.php"><div class="menu_elem"> > Wilgotność powietrza</div></a>
<a href="pressure.php"><div class="menu_elem"> > Ciśnienie atmosferyczne</div></a>
<a href="charts.php"><div class="menu_elem">Prezentacja klasy wykresów</div></a>

<div id="fx1" >MENU</div>
</div>
</div>

<div id="content">

<div class="roomContainer">
<div class="elem_head">Aktualne parametry z czujników</div>
<div id="dataTakenTimestamp" style="color:#d3d3d3;"></div>

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
	</div>
</div>

<!--element#1-->
<div class="elem"><div class="elem_head">Info</div>
Przykłady zastosowanie<br>
klasy wykresów dla kilku<br>
różnych przypadków.
</div>

<!--Wykres: HALL -->
<div class="bigElem">
<div class="elem_head">Dane z czujnika HALLa w czasie rzeczywistym</div>
	<div>
		<canvas id="hallCan" width="1400px" height="500px" style="border:1px solid #d3d3d3;"></canvas>
	</div>
	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG1" onclick="hide_show_config('hallCan_setCont')">KONFIGURACJA</button> </span>
	<div class="settingsContainer" id="hallCan_setCont">
		<!-- klasa sama zbuduje tu menu ustawien -->
	</div>
</div>

<!--Wykres: 1-->
<div class="bigElem">
<div class="elem_head">Funkcja kwadratowa</div>
	<div>
		<canvas id="can01" width="1400px" height="500px" style="border:1px solid #d3d3d3;"></canvas>
	</div>
	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG2" onclick="hide_show_config('can01_setCont')">KONFIGURACJA</button> </span>
	<div class="settingsContainer" id="can01_setCont">
	</div>
</div>


<!--Wykres: 2-->
<div class="bigElem">
<div class="elem_head">Funkcja sigmoidalna</div>
	<div>
		<canvas id="can02" width="1400px" height="500px" style="border:1px solid #d3d3d3;"></canvas>
	</div>
	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG3" onclick="hide_show_config('can02_setCont')">KONFIGURACJA</button> </span>
	<div class="settingsContainer" id="can02_setCont">
	</div>
</div>


<!--Wykres: 3-->
<div class="bigElem">
<div class="elem_head">Funkcja sin f(x)=1/2 sin(x) + 1/4 sin(4x) (małe wartości)</div>
	<div>
		<canvas id="can03" width="1400px" height="500px" style="border:1px solid #d3d3d3;"></canvas>
	</div>
	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG" onclick="hide_show_config('can03_setCont')">KONFIGURACJA</button> </span>
	<div class="settingsContainer" id="can03_setCont">
	</div>
</div>


</div>


<footer>
	<?php echo "Markowiak Paweł &copy ".date("Y-m-d");?>
</footer>
</body>

<script src="charts.js?ts=<?=time()?>">			</script>
<script src="globalScript.js?ts=<?=time()?>">	</script>

<script>
var dataY = new Array(24).fill(0);
var dataX = new Array(24).fill(0);

// dane wykresy 2,3,4
var data2x = Array(50).fill(0);
var data2y = Array(50).fill(0);

var data3x = Array(50).fill(0);
var data3y = Array(50).fill(0);

var data4x = Array(360).fill(0);
var data4y = Array(360).fill(0);

var chartObject = new markCharts("hallCan");
var chartObject1 = new markCharts("can01");
var chartObject2 = new markCharts("can02");
var chartObject3 = new markCharts("can03");

window.addEventListener('resize', reportWindowSize);

function reportWindowSize() {
	var adjWinW = window.innerWidth-100;
	chartObject.adjustWindowChartW(adjWinW);
	chartObject1.adjustWindowChartW(adjWinW);
	chartObject2.adjustWindowChartW(adjWinW);
	chartObject3.adjustWindowChartW(adjWinW);
	chartObject.plot(dataY,dataX);
	chartObject1.plot(data2y,data2x);
	chartObject2.plot(data3y,data3x);
	chartObject3.plot(data4y,data4x);}

function cath(){
	chartObject.plot(dataY,dataX);
	chartObject1.plot(data2y,data2x);
	chartObject2.plot(data3y,data3x);
	chartObject3.plot(data4y,data4x);
}
reportWindowSize()

function updHall()
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://"+ESP_IP+"/hall", true);

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				for (let i=1; i<24; i++)
				{
					dataY[i-1] = dataY[i]
					dataX[i] = i
				}
				dataY[23] = parseInt(this.responseText,10)
				chartObject.plot(dataY,dataX);
				}
				
			};
			xhr.send(null);
	
}
setInterval(updHall,350)
updHall()

// Wypelnianie wykresow
for (let i=0; i<50; i++)
{
	data2y[i] = Math.pow(i,2)
	data2x[i] = i
}
chartObject1.plot(data2y,data2x)

for (let i=0; i<50; i++)
{
	data3y[i] = -1*(1-(Math.pow(Math.E,i-25)))/(1+Math.pow(Math.E,i-25))
	data3x[i] = i-25
}
chartObject2.plot(data3y,data3x)

var RAD = 0.01745329251994329576923690768489
for (let i=0; i<360; i++)
{
	data4y[i] = 0.25*Math.sin(i*RAD)+0.125*Math.sin(4*i*RAD)
	data4x[i] = (i*RAD).toFixed(3)
}
chartObject3.plot(data4y,data4x)
</script>

</html>

