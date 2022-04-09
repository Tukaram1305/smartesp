<?php
/*
session_start();

if (!isset($_SESSION['zalogowany']))
{
	header('Location:loginuser.php');
	exit();
}
*/
?>

<!DOCTYPE HTML5>
<html>
<head>
<title>Esp32</title>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="styl.css?ts=<?=time()?>" />
<link rel="stylesheet" type="text/css" href="details.css?ts=<?=time()?>" />
<link rel="stylesheet" type="text/css" href="controls.css?ts=<?=time()?>" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Gelasio:wght@600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Days+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Sarpanch:wght@800&display=swap" rel="stylesheet">


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<?php
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

<!--<body onload="aquireSettings(), reportWindowSize()">-->
	<body>
<header>
<div class="parent">
	<div id="h_bg"><img src="img/BG4.png"/></div>
		<div id="fringle1"></div>
		<div id="fringle2"></div>
			<div id="h_title">
			Smart home z ESP
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
<a href="temperature.php"><div class="menu_elem">Temperatura</div></a>
<a href="humidity.php"><div class="menu_elem">Wilgotność powietrza</div></a>
<a href="pressure.php"><div class="menu_elem">Ciśnienie atmosferyczne</div></a>
<a href="dane.php"><div class="menu_elem">Prezentacja klasy wykresów</div></a>




<div id="fx1" >MENU</div>
</div>
</div>

<div id="content">
<?php
$dane = file_get_contents("dane.txt");
echo<<<END

<div class="d1 elem">
<div class="elem_head">Kolor tła #1</div>
<form action="send_col.php" method="GET">
<input type="color" id="bc1" onchange="chcol()" value="$dane" style="width:120px; height:60px;" name="kolor"/>
<div><input class="send" type="submit"\></div>
</form>
</div>

<div class="d1 elem">
<div class="elem_head">Kolor tła #2</div>
<form action="send_col.php" method="GET">
<input type="color" id="bc2" value="$dane" style="width:120px; height:60px;" name="kolor"/>
<div><input class="send" type="submit"\></div>
</form>
</div>

END;
?>

<!--element#1-->
<div class="elem"><div class="elem_head">Header dla bloczków</div>
	<?php $txt = file_get_contents("randtext.txt"); print $txt; ?>
</div>

<div class="roomContainer">
<div class="elem_head">Salon</div>
<div id="dataTakenTimestamp" style="color:#d3d3d3;"></div>

	<div class="roomSubContainer">
		<div class="elem">
			<div class="elem_head">Temperatura</div>
			<div><img src="icons/TEMP.png" height="100%" width="80" alt="Temperatura"></img></div></br>
			<div id="tempholder" class="VALL_DISP">...</div>
		</div>

		<div class="elem">
			<div class="elem_head">Wilgotność</div>
			<div><img src="icons/HUM.png" height="100%" width="80" alt="Wilgotność"></img></div></br>
			<div id="humholder" class="VALL_DISP">...</div>
		</div>

		<div class="elem">
			<div class="elem_head">Ciśnienie</div>
			<div><img src="icons/PRESS.png" height="100%" width="80" alt="Ciśnienie"></img></div></br>
			<div id="pressholder" class="VALL_DISP">...</div>
		</div>
	</div>
</div>


<div class="elem">
<div class="elem_head">Przełącznik #1</div>
	<div class="LED_FG" style="padding:5px;"><img src="icons/RELAY.png" width="80px" height="auto"/></div>
	<form action="http://192.168.1.35/get" method="GET">
	  <label class="switch">
	  <input name="input1" id="chk1" type="checkbox" value="RELAY_1" onchange="sendSwitch()">
	  <span class="sliderTGL round"></span>
	  </label> 
	  <br><div id="chkbox1">stan?<br></div>
	  <input type="submit" value="Submit">
	  </form>
</div>

<!-- OSWIETLENIE -->
<div class="elem">
<div class="elem_head">LED #1</div>
	<div class="parent">
		<div class="LED_BG" id="LEDbg1"></div>
		<div class="LED_FG" style="padding:5px;"><img src="img/LED1.png" width="100px" height="auto"/></div>
	</div>
	<div id="val2">KOLOR</div>
<input id="sd3" name="cval2" style="width:140px; height:40px;" type="color" value="#FFCC00" oninput="updRangeRGB()">
</div>
	  
<div class="elem">
<div class="elem_head">LED #2</div>
	<div class="parent">
		<div class="LED_BG" id="LEDbg2"></div>
		<div class="LED_FG" style="padding:5px;"><img src="img/LED1.png" width="100px" height="auto"/></div>
	</div>
	<div id="val3">KOLOR</div>
<input id="sd4" name="cval3" style="width:140px; height:40px;" type="color" value="#FFCC00" oninput="updRangeRGB2()">
</div>


<div class="elem">
	<div class="parent">
		<div id="bar"></div>
		<div id="bar_l"></div>
	</div>
	<div>. . . .</br>
		<form action="wjson.php">
		<input id="sd1" class="slider" type="range" name="TEMPVAL" min="0" max="50" step="0.25" oninput="updRange()">Zakres:
		<div><input type="submit"/></div>
		</form>
	</div>
	<div id="RangeVal">...</div>
</div>

<div class="elem">
<div><img id="gear1" src="img/gear3.png" width="80%" height="auto"/></div>
<div><img id="gear2" src="img/gear4.png" width="40%" height="auto"/></div>
</div>
	  
<div class="elem">
	<div><canvas id="dialCan" width="480" height="240" style="border:1px solid #d3d3d3;"></div>
</div>
	
<div class="elem">
	<div>
		<canvas id="drawCan" width="480" height="240" style="border:1px solid #d3d3d3;">
	</div>
</div>


<!-- glowny canvas bigCan -->
<div class="bigElem">
<div class="elem_head">Wykres</div>
	<div>
		<canvas id="bigCan" width="1400px" height="500px" style="border:1px solid #d3d3d3;">
	</div>

	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG" onclick="hide_show_config('bigCan_setCont')">KONFIGURACJA</button> </span>
	
	<div class="settingsContainer" id="bigCan_setCont">
	<div id="bccon">  <span>....</span></div>
		<!-- klasa sama zbuduje tu menu ustawien -->
	</div>
</div>
<!-- glowny canvas bigCan -->

<!-- glowny canvas bigCan -->
<div class="bigElem">
	<script>
		function getDataToChart(dtype,input,chart)
		{
			//console.log("arg1: "+dtype+"  / arg2: "+input)
			var xhr = new XMLHttpRequest();
			var sendReq = "sensorType="+dtype;
			if (input=="dz")
			{
				var dateTime = $("#fDate").val();
				var dataRange = document.querySelector('input[name="nZakres"]:checked').value;
				sendReq+="&startDate="+dateTime+"&Range="+dataRange;
				console.log("Data: "+sendReq)
			}
			if (input=="dd")
			{
				var dtStart = $("#dZakresMin").val();
				var dtEnd = $("#dZakresMax").val();

				sendReq+="&startDate="+dtStart+"&endDate="+dtEnd;
				console.log("Data: "+sendReq)
			}
			xhr.open("POST", "../smartesp/getChartDataFromDB.php", false);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					//HTTPReq
					xhr.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						console.log("RES: "+this.responseText);
						mJson = JSON.parse(this.responseText);
						var ile = Object.keys(mJson).length;
						dataY = [];
						dataX = [];
						for (let i=0; i<ile; i++)
							{
								dataY[i] = parseFloat(mJson[i][0]);
								dataX[i] = mJson[i][1];
							}
							chart.plot(dataY,dataX);
							$("#numInfo").html("Zanalzłem ("+ile+") rekordów")
						}
					};
					xhr.send(sendReq);
		}
	</script>
<div class="elem_head">Temperatura - wykres</div>
	<div class="roomContainer">
		<div class="roomSubContainer">
		<span>
			<button type="button" class="btn1" value="dd" onclick="getDataToChart('Temperature','dd',bigChart2);">Pobierz dane</button>
			Data - od: 
			<input type="date" name="dZakresMin" id="dZakresMin" 
			min="<?php print $minKnownFormDate ?>" 
			max="<?php print $maxKnownFormDate ?>" 
			value="<?php print $minKnownFormDate ?>"> - do: 
			<input type="date" name="dZakresMax" id="dZakresMax" 
			min="<?php print $minKnownFormDate ?>" 
			max="<?php print $maxKnownFormDate ?>"
			value="<?php print $maxKnownFormDate ?>">
			<span id="numInfo" style="color:white;"></span>
		</span>
		</div>

		<div class="roomSubContainer">
		<button type="button" class="btn1" value="dd" id="bt1" onclick="getDataToChart('Temperature','dz',bigChart2);">Pobierz dane</button>
		<span>Przedział - od: <input type="datetime-local" name="fDate" id="fDate"> , ostatnie:
		<input type="radio" name="nZakres" id="nZakres1" value="1 HOUR">				<label for="nZakres1">1h </label>
		<input type="radio" name="nZakres" id="nZakres2" value="12 HOUR" checked="1">	<label for="nZakres2">12h </label>
		<input type="radio" name="nZakres" id="nZakres3" value="24 HOUR">				<label for="nZakres2">24h </label>
		<input type="radio" name="nZakres" id="nZakres4" value="1 WEEK">				<label for="nZakres4">1 tyg. </label>
		<input type="radio" name="nZakres" id="nZakres5" value="2 WEEK">				<label for="nZakres5">2 tyg. </label>
		<input type="radio" name="nZakres" id="nZakres6" value="1 MONTH">				<label for="nZakres6">1 mies. </label>
		<input type="radio" name="nZakres" id="nZakres7" value="2 MONTH">				<label for="nZakres7">2 mies. </label>
		<input type="radio" name="nZakres" id="nZakres8" value="4 MONTH">				<label for="nZakres8">4 mies. </label>
		</span>
		</div>
	</div>

	<div id="CANCAN" class="parent">
		<canvas id="chart1" width="1400px" height="500px" style="position:relative; border:1px solid #d3d3d3; z-index:1;">
	</div>

	<span><button type="button" class="btn1" id="CH1_SHOW_CONFIG" onclick="hide_show_config('chart1_setCont')">KONFIGURACJA</button> </span>

	<div class="settingsContainer" id="chart1_setCont">
	<div id="bccon2">  <span>....</span></div>
		<!-- klasa sama zbuduje tu menu ustawien -->
	</div>
	<script>

	</script>
</div>
<!-- glowny canvas bigCan -->

<!-- glowny canvas bigCan -->
<div class="bigElem">
<div class="elem_head">Temperatura - zestawienie tabelaryczne</div>
	<table width="1300px" align="center" border="1" bordercolor="#d5d5d5"  cellpadding="4" cellspacing="0">
		<tr>
			<th></th>
			<th>Minimalna</th>
			<th>Maksymalna</th>
			<th>Średnia</th>
		</tr>
		<tr>
			<th id="th0">Ostatnia Godzina</th>
			<td id="t0_n">...</td>
			<td id="t0_x">...</td>
			<td id="t0_g">...</td>
		</tr>
		<tr>
			<th id="th1">Ostatnie 24h</th>
			<td id="t1_n">...</td>
			<td id="t1_x">...</td>
			<td id="t1_g">...</td>
		</tr>
		<tr>
			<th id="th2">Ostatni Tydzień</th>
			<td id="t2_n">...</td>
			<td id="t2_x">...</td>
			<td id="t2_g">...</td>
		</tr>
		<tr>
			<th id="th3">Ostatni Miesiąc</th>
			<td id="t3_n">...</td>
			<td id="t3_x">...</td>
			<td id="t3_g">...</td>
		</tr>
	</table>
</div>
<script>
function getDataFromDB(dtype)
{
	var xhr = new XMLHttpRequest();
	var sendReq = "sensorType="+dtype;
	xhr.open("POST", "../smartesp/getTabDataFromDB.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log("RES: "+this.responseText);
				mJson = JSON.parse(this.responseText);
				var subTsStyleMin = "\"font-size:16px; color: #3d387a; text-shadow:none;\"";
				var subTsStyleMax = "\"font-size:16px; color: #a54545; text-shadow:none;\"";
				var subTsStyleAvg = "\"font-size:16px; color: #30711e; text-shadow:none;\"";
				var unit = " &#176;C";
				var aUP = "<img src='img/arrUp.png' width='30'/>"
				var aDOWN = "<img src='img/arrDown.png' width='30'/>"
				
				$("#t0_n").html(mJson.minHour.MIN+unit+(parseFloat(mJson.minHour.MIN) > parseFloat(mJson.minDay.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minHour.TS+"</span>");
				$("#t0_x").html(mJson.maxHour.MAX+unit+(parseFloat(mJson.maxHour.MAX) > parseFloat(mJson.maxDay.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxHour.TS+"</span>");
				$("#t0_g").html(mJson.avgHour.AVG+unit+(parseFloat(mJson.avgHour.AVG) > parseFloat(mJson.avgDay.AVG) ? aUP : aDOWN ));
				$("#th0").html("Ostatnia godzina<br><span style="+subTsStyleMax+">Z ( "+mJson.HourNums.ILE+" ) Rekordów</span>");

				$("#t1_n").html(mJson.minDay.MIN+unit+(parseFloat(mJson.minDay.MIN) > parseFloat(mJson.minWeek.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minDay.TS+"</span>");
				$("#t1_x").html(mJson.maxDay.MAX+unit+(parseFloat(mJson.maxDay.MAX) > parseFloat(mJson.maxWeek.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxDay.TS+"</span>");
				$("#t1_g").html(mJson.avgDay.AVG+unit+(parseFloat(mJson.avgDay.AVG) > parseFloat(mJson.avgWeek.AVG) ? aUP : aDOWN ));
				$("#th1").html("Ostatnie 24 godziny<br><span style="+subTsStyleMax+">Z ( "+mJson.DayNums.ILE+" ) Rekordów</span>");

				$("#t2_n").html(mJson.minWeek.MIN+unit+(parseFloat(mJson.minWeek.MIN) > parseFloat(mJson.minMonth.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minWeek.TS+"</span>");
				$("#t2_x").html(mJson.maxWeek.MAX+unit+(parseFloat(mJson.maxWeek.MAX) > parseFloat(mJson.maxMonth.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxWeek.TS+"</span>");
				$("#t2_g").html(mJson.avgWeek.AVG+unit+(parseFloat(mJson.avgWeek.AVG) > parseFloat(mJson.avgMonth.AVG) ? aUP : aDOWN ));
				$("#th2").html("Ostatni tydzień<br><span style="+subTsStyleMax+">Z ( "+mJson.WeekNums.ILE+" ) Rekordów</span>");

				$("#t3_n").html(mJson.minMonth.MIN+unit+"<br><span style="+subTsStyleMin+">"+mJson.minMonth.TS+"</span>");
				$("#t3_x").html(mJson.maxMonth.MAX+unit+"<br><span style="+subTsStyleMax+">"+mJson.maxMonth.TS+"</span>");
				$("#t3_g").html(mJson.avgMonth.AVG+unit);
				$("#th3").html("Ostatni miesiąc<br><span style="+subTsStyleMax+">Z ( "+mJson.MonthNums.ILE+" ) Rekordów</span>");

				var ile = Object.keys(mJson).length;
				}
			};
			xhr.send(sendReq);
}
getDataFromDB("Temperature")

</script>
<!-- glowny canvas bigCan -->

<!--
<div class="elem">
	<img src="https://www.etechnophiles.com/wp-content/uploads/2021/03/esp32-Board-with-30-pins-Pinout.png?ezimgfmt=ng%3Awebp%2Fngcb40%2Frs%3Adevice%2Frscb40-1" width="100%" height="auto" />
</div>
-->

<div class="elem">
	<button type="button" onclick="dodaj()">Dodaj</button>
</div>

</div>
</div>



<footer>
	<?php echo "Markowiak Paweł &copy ".date("Y-m-d");?>
</footer>
</body>

<script src="skrypt.js?ts=<?=time()?>">			</script>
<script src="charts.js?ts=<?=time()?>">			</script>
<script src="globalScript.js?ts=<?=time()?>">	</script>
<script src="funScript.js?ts=<?=time()?>">		</script>

<script>

var date = new Date();
		var day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear(),
			hour = date.getHours(),
			min  = date.getMinutes();

		month = (month < 10 ? "0" : "") + month;
		day = (day < 10 ? "0" : "") + day;
		hour = (hour < 10 ? "0" : "") + hour;
		min = (min < 10 ? "0" : "") + min;

		var currDate = year + "-" + month + "-" + day,
			currTime = hour + ":" + min; 

		//console.log("dt: "+currDate+currTime)
		$("#fDate").val(currDate+"T"+currTime)


var bigChart2 = new markCharts("chart1",0);

//var ay = [15.3,16,15.8,14.7,15.32,15.77,16.43,14.87,15];
//var ax = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//bigChart2.plot(ay,ax);
//bigChart2.plot(ay,ax);
getDataToChart('Temperature','dz',bigChart2);

var dataY = [];
var dataX = [];
</script>

</html>

