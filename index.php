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

<body onload="aquireSettings(), reportWindowSize()">
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
<div id="sidenav" onclick="zwin()">
<span class="vtext">MENU</span>
<a href="index.php"><div class="menu_elem">Strona główna</div></a>
<a href="dane.php"><div class="menu_elem">Dane</div></a>
<div class="menu_elem">Tu jakis item #</div>
<div class="menu_elem">Tu jakis item #</div>
<div id="fx1">MENU</div>
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

<div class="elem" id="E1">
	<div class="elem_head">Temperatura</div>
	<div><img src="icons/TEMP.png" height="100%" width="80" alt="Temperatura"></img></div></br>
	<div id="tempholder" class="VALL_DISP">...</div>
</div>

<div class="elem" id="E2">
	<div class="elem_head">Wilgotność</div>
	<div><img src="icons/HUM.png" height="100%" width="80" alt="Wilgotność"></img></div></br>
	<div id="humholder" class="VALL_DISP">...</div>
</div>

<div class="elem">
	<div class="elem_head">Ciśnienie</div>
	<div><img src="icons/PRESS.png" height="100%" width="80" alt="Ciśnienie"></img></div></br>
	<div id="pressholder" class="VALL_DISP">...</div>
</div>


<div class="elem">
	<div> <canvas id="myCan" width="480" height="240" style="border:1px solid #d3d3d3;"></div>
	<div> <input id="sd2" name="cval" style="width:140px;" type="color" value="#FFCC00" oninput="updRangeCol()"></div>
	<p id="val1">&lt;kolor&gt;</p>
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

<div class="bigElem">
<div class="elem_head">Wykres</div>
	<div>
		<canvas id="bigCan" width="1400px" height="500px" style="border:1px solid #d3d3d3;">
	</div>
	<div id="bccon"><span><button type="button">KONFIGURACJA</button> </span>  <span>konsola</span>   </div>

	<div class="settingsContainer">
		
		<div class="setSubContainer">
			<div class="setSubLabels">Gradient pod wykresem</div>
				<span><input type="color" id="C1_BG1" value="#111111" oninput="updateSettings()"><label for="C1_BG1">--Bazowy kolor pod wykresem 1</label></span>
				<span><input type="color" id="C1_BG2" value="#111111" oninput="updateSettings()"><label for="C1_BG2">--Bazowy kolor pod wykresem 2</label></span>
			<div class="setSubLabels">Rozpiętość/Skupienie</div>
				<span><input id="C1_BG_GRDSPAN1" class="slider2" type="range" oninput="updateSettings()" min="0.05" max="0.45" step="0.01" value="0.25"></span>
			<div class="setSubLabels">Gradient lewego marginesu</div>
				<span><input type="color" id="C1_LMBG1" value="#111111" oninput="updateSettings()"><label for="C1_LMBG1">--Bazowy kolor grad #1</label></span>
				<span><input type="color" id="C1_LMBG2" value="#111111" oninput="updateSettings()"><label for="C1_LMBG2">--Bazowy kolor grad #2</label></span>
			<div class="setSubLabels">Gradient dolnego marginesu</div>
				<span><input type="color" id="C1_BMBG1" value="#111111" oninput="updateSettings()"><label for="C1_BMBG1">--Bazowy kolor pod wykresem</label></span>
				<span><input type="color" id="C1_BMBG1" value="#111111" oninput="updateSettings()"><label for="C1_BMBG1">--Bazowy kolor pod wykresem</label></span>
			
			<button type="button" class="btn1" onclick="saveSettings()">Zapisz ustawienia</button>
			<div id="bttest"><input type="button" value="Przelacznik"></div>
		</div>

		<div class="setSubContainer">
		<div class="setSubLabels">--Wykres--</div>
		<div class="setSubLabels">Gradient wykresu</div>
				<span><input type="color" id="C1_CHARTGRAD_TOP" value="#111111" oninput="updateSettings()"><label for="C1_CHARTGRAD_TOP">--Wypełnienie wykresu (TOP)^^^</label></span>
				<span><input type="color" id="C1_CHARTGRAD_MID" value="#111111" oninput="updateSettings()"><label for="C1_CHARTGRAD_MID">--Wypełnienie wykresu (MID)---</label></span>
				<span><input type="color" id="C1_CHARTGRAD_BOT" value="#111111" oninput="updateSettings()"><label for="C1_CHARTGRAD_BOT">--Wypełnienie wykresu (BOT)vvv</label></span>
			<div class="setSubLabels">Rozpiętość/Skupienie</div>
				<span><input id="C1_CHART_GRAD_SPAN" class="slider2" type="range" oninput="updateSettings()" min="0.01" max="0.49" step="0.01" value="0.25"></span>
				<div class="setSubLabels">Przeźroczystość</div>
				<span><input id="C1_CHART_GRAD_TRANS" class="slider2" type="range" oninput="updateSettings()" min="0.01" max="1.0" step="0.01" value="0.75"></span>
		</div>

		<div class="setSubContainer">
			<span><input type="checkbox" id="id" name="id" value="id"> <label for="id">Średnia arytmetyczna</label></span>
			<span><input type="checkbox" id="imie" name="imie" value="subscriber_name" checked="1"> <label for="imie">Średnia kwadratowa (RMS)</label></span>
			<span><input type="checkbox" id="akcja" name="akcja" value="action_performed"> <label for="akcja">Regresja liniowa</label></span>
			<span><input type="checkbox" id="czas" name="czas" value="date_added"> <label for="czas">Minimalna (wartość)</label></span>
			<span><input type="checkbox" id="czas" name="czas" value="date_added"> <label for="czas">Maksymalna (wartość)</label></span>
		</div>

		<div class="setSubContainer">
			<span><input type="radio" id="sid" name="sort" value="id"> <label for="sid">I.D.</label></span>
			<span><input type="radio" id="simie" name="sort" checked="1" value="subscriber_name"> <label for="simie">BEVEL</label> </span>
			<span><input type="radio" id="sakcja" name="sort" value="action_performed"> <label for="sakcja">ROUND</label></span>
			<span><input type="radio" id="sczas" name="sort" value="date_added"> <label for="sczas">MITER</label></span>
		</div>

	</div>

</div>

<div class="elem">
	<img src="https://www.etechnophiles.com/wp-content/uploads/2021/03/esp32-Board-with-30-pins-Pinout.png?ezimgfmt=ng%3Awebp%2Fngcb40%2Frs%3Adevice%2Frscb40-1" width="100%" height="auto" />
</div>

<div class="elem">
	<button type="button" onclick="dodaj()">Dodaj</button>
</div>

</div>
</div>



<footer>
	<?php echo "Markowiak Paweł &copy ".date("Y-m-d");?>
</footer>
</body>

<script src="skrypt.js?ts=<?=time()?>" ></script>
<script src="charts.js?ts=<?=time()?>" ></script>




