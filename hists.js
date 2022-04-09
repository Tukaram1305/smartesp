// Markowiak Pawel - klasa markCharts dla rysowania wykresow
// Zapis ustawien wykresu
function saveset(canID)
{
	//alert("Moje ID: "+canID);
	var setJson = {}

	// gradienty pod gridem
	setJson.BTN_GRAD_1 = document.getElementById(canID+"_BTN_GRAD_1").value;
	setJson.BTN_GRAD_2 = document.getElementById(canID+"_BTN_GRAD_2").value;
	setJson.BG_GRD_SPAN = document.getElementById(canID+"_BG_GRD_SPAN").value;
	// gradienty wypelnienia
	setJson.BTN_CHAR_GRAD_TOP = document.getElementById(canID+"_BTN_CHAR_GRAD_TOP").value;
	setJson.BTN_CHAR_GRAD_MID = document.getElementById(canID+"_BTN_CHAR_GRAD_MID").value;
	setJson.BTN_CHAR_GRAD_BOT = document.getElementById(canID+"_BTN_CHAR_GRAD_BOT").value;
	setJson.CHART_GRD_SPAN = document.getElementById(canID+"_CHART_GRD_SPAN").value;
	setJson.CHART_GRD_TRANS = document.getElementById(canID+"_CHART_GRD_TRANS").value;
	// l/r margines
	setJson.BTN_L_MARGIN_COL = document.getElementById(canID+"_BTN_L_MARGIN_COL").value;
	setJson.BTN_B_MARGIN_COL = document.getElementById(canID+"_BTN_B_MARGIN_COL").value;
	// dodatki
	setJson.SHOW_AVG = document.getElementById(canID+"_SHOW_AVG").checked;
	setJson.SHOW_RMS = document.getElementById(canID+"_SHOW_RMS").checked;
	setJson.SHOW_REGRESSION = document.getElementById(canID+"_SHOW_REGRESSION").checked;
	setJson.SHOW_MIN = document.getElementById(canID+"_SHOW_MIN").checked;
	setJson.SHOW_MAX = document.getElementById(canID+"_SHOW_MAX").checked;
	setJson.SHOW_CMZT = document.getElementById(canID+"_SHOW_CMZT").checked;
	// linie/znaczniki/wysokosc wykr.
	setJson.CHART_LINE_COL = document.getElementById(canID+"CHART_LINE_COL").value;
	setJson.CHART_LINE_W = document.getElementById(canID+"_CHART_LINE_W").value;
	setJson.CHART_DOT_COL = document.getElementById(canID+"CHART_DOT_COL").value;
	setJson.CHART_DOT_SZ = document.getElementById(canID+"_CHART_DOT_SZ").value;
	setJson.CHART_HEIGHT = document.getElementById(canID+"_CHART_HEIGHT").value;
	setJson.STYLE_LINE = document.getElementById(canID+"_STYLE_LINE").checked;
	setJson.STYLE_DOT = document.getElementById(canID+"_STYLE_DOT").checked;
	setJson.STYLE_LpD = document.getElementById(canID+"_STYLE_LpD").checked;

	/*
	console.log("Zapisuje ustawienia: ")
	for (const [key, value] of Object.entries(setJson)) {
		console.log(`${key}: ${value}`);
	}
	*/
	// parsuj ustawienia na string
	var strJson = (JSON.stringify(setJson));
	//console.log(strJson)

	var xhr = new XMLHttpRequest();

			//HTTPReq
			xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { console.log("Response: "+xhr.responseText); } }		
			xhr.open("POST", "../smartesp/saveSettings.php");
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("MODE=save"+"&CANID="+canID+"&sJson="+encodeURIComponent(strJson));
}

// Zaladowanie ustawien wykresu
function loadset(canID)
{
	var xhr = new XMLHttpRequest();
		//HTTPReq
		xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText=="no_file") 
			{
				alert("BRAK USTAWIEN dla: "+canID);
				return;
			}
			var setJson = JSON.parse(this.responseText);
			
			/*
			console.log("Zaladowalem ustawienia ID: "+canID+" :: ")
			for (const [key, value] of Object.entries(setJson)) {
				console.log(`${key}: ${value}`);}
				console.log("-----------END ")
			*/

	// gradienty pod gridem
	document.getElementById(canID+"_BTN_GRAD_1").value = setJson.BTN_GRAD_1
	document.getElementById(canID+"_BTN_GRAD_2").value = setJson.BTN_GRAD_2
	document.getElementById(canID+"_BG_GRD_SPAN").value = setJson.BG_GRD_SPAN
	// gradienty wypelnienia
	document.getElementById(canID+"_BTN_CHAR_GRAD_TOP").value = setJson.BTN_CHAR_GRAD_TOP
	document.getElementById(canID+"_BTN_CHAR_GRAD_MID").value = setJson.BTN_CHAR_GRAD_MID
	document.getElementById(canID+"_BTN_CHAR_GRAD_BOT").value = setJson.BTN_CHAR_GRAD_BOT
	document.getElementById(canID+"_CHART_GRD_SPAN").value = setJson.CHART_GRD_SPAN
	document.getElementById(canID+"_CHART_GRD_TRANS").value = setJson.CHART_GRD_TRANS
	// l/r margines
	document.getElementById(canID+"_BTN_L_MARGIN_COL").value = setJson.BTN_L_MARGIN_COL
	document.getElementById(canID+"_BTN_B_MARGIN_COL").value = setJson.BTN_B_MARGIN_COL
	// dodatki
	document.getElementById(canID+"_SHOW_AVG").checked = setJson.SHOW_AVG
	document.getElementById(canID+"_SHOW_RMS").checked = setJson.SHOW_RMS
	document.getElementById(canID+"_SHOW_REGRESSION").checked = setJson.SHOW_REGRESSION
	document.getElementById(canID+"_SHOW_MIN").checked = setJson.SHOW_MIN
	document.getElementById(canID+"_SHOW_MAX").checked = setJson.SHOW_MAX
	document.getElementById(canID+"_SHOW_CMZT").checked = setJson.SHOW_CMZT
	// linie/znaczniki/wysokosc wykr.
	document.getElementById(canID+"CHART_LINE_COL").value = setJson.CHART_LINE_COL
	document.getElementById(canID+"_CHART_LINE_W").value = setJson.CHART_LINE_W
	document.getElementById(canID+"CHART_DOT_COL").value = setJson.CHART_DOT_COL
	document.getElementById(canID+"_CHART_DOT_SZ").value = setJson.CHART_DOT_SZ
	document.getElementById(canID+"_CHART_HEIGHT").value = setJson.CHART_HEIGHT
	document.getElementById(canID+"_STYLE_LINE").checked = setJson.STYLE_LINE
	document.getElementById(canID+"_STYLE_DOT").checked = setJson.STYLE_DOT
	document.getElementById(canID+"_STYLE_LpD").checked = setJson.STYLE_LpD
	
			}
		};
		xhr.open("POST", "../smartesp/saveSettings.php",false); // zapytaj synchronicznie, przed wywolaniem plot()
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("MODE=load"+"&CANID="+canID);

}

// Pokaz/schowaj menu konfiguracji
function hide_show_config(id)
{
	var item = document.getElementById(id);
	if (item.style.display==="inline-flex")  item.style.display = "none";
	else item.style.display = "inline-flex";
}


// Moja klasa wykresow - konstruktor przyjmuje ID canvas jaki bedzie uzywany
class markHist
{
	constructor(canID)
	{
		this.canID = canID;
		this.canvas = document.getElementById(canID);
		this.chartBordLeft = 0;
		this.chartBordBot = 100;
		this.chartBordRight = 30;

		this.winWidChngParams = 1080;
		this.chartTOPBOT_margin = 20;

		this.ChartMaxWidth = 2048;
		//FONT
		this.labFntName = "sans-serif"
		this.labFntSize = 10
		this.LabFont = this.labFntSize+"px "+this.labFntName;
		
		this.createControls(canID);
		loadset(canID);
	}

	adjustWindowChartW(adjWinW)
	{
		this.canvas.width = Math.min(adjWinW,this.ChartMaxWidth);
	}


	createControls(canID) {
		var mainSetContainer = document.getElementById(canID+"_setCont");
		var spanElem;
		// pierwszy subkontener
		var elem = document.createElement("DIV");
		elem.classList.add("setSubContainer");
		elem.id = canID+"ssc1";
		mainSetContainer.appendChild(elem);
		// subLabel
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Gradienty pod wykresem"
		document.getElementById(canID+"ssc1").appendChild(elem);

		// 1. color (grad pod wykresem)
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc1").appendChild(spanElem);
					// input color (1)
		elem = document.createElement("INPUT");
		elem.type = "color"
		elem.id = canID+"_BTN_GRAD_1";
		elem.value = "#222222"
		elem.addEventListener("input",cath);
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_BTN_GRAD_1";
		elem.innerHTML = "-- Bazowy kolor #1"
		spanElem.appendChild(elem);
	
		// 2. color (grad pod wykresem)
					// span2
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc1").appendChild(spanElem);
					// input color (2)
		elem = document.createElement("INPUT");
		elem.type = "color"
		elem.id = canID+"_BTN_GRAD_2";
		elem.value = "#212121"
		elem.addEventListener("input",cath);
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_BTN_GRAD_2";
		elem.innerHTML = "-- Bazowy kolor #2"
		spanElem.appendChild(elem);

					// subLabel
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Rozpiętość / Skupienie"
		document.getElementById(canID+"ssc1").appendChild(elem);
	
		// slider (roz/sku grad gridu)
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc1").appendChild(spanElem);
					// slider + parametry
		elem = document.createElement("INPUT");
		elem.id = canID+"_BG_GRD_SPAN";
		elem.classList.add("slider2");
		elem.type = "range";
		elem.min = "0.05";
		elem.max = "0.45";
		elem.step = "0.01";
		elem.value = "0.25";
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);

		// Kolory marginesow
		// 1. color (lewy)
				// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc1").appendChild(spanElem);
					// input color (3)
		elem = document.createElement("INPUT");
		elem.type = "color"
		elem.id = canID+"_BTN_L_MARGIN_COL";
		elem.value = "#ffaa55"
		elem.addEventListener("input",cath);
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_BTN_L_MARGIN_COL";
		elem.innerHTML = "-- Lewy Margines"
		spanElem.appendChild(elem);

		// 2. color (dolny)
				// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc1").appendChild(spanElem);
					// input color (3)
		elem = document.createElement("INPUT");
		elem.type = "color"
		elem.id = canID+"_BTN_B_MARGIN_COL";
		elem.value = "#aaff23"
		elem.addEventListener("input",cath);
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_BTN_B_MARGIN_COL";
		elem.innerHTML = "-- Dolny Margines"
		spanElem.appendChild(elem);


		// drugi subkontener
		elem = document.createElement("DIV");
		elem.classList.add("setSubContainer");
		elem.id = canID+"ssc2";
		mainSetContainer.appendChild(elem);
		// subLabel 2
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Wykresy"
		document.getElementById(canID+"ssc2").appendChild(elem);
		
		// 1. color (wykres TOP)
					// span
					spanElem = document.createElement("SPAN");
					document.getElementById(canID+"ssc2").appendChild(spanElem);
								// input color (2)
					elem = document.createElement("INPUT");
					elem.type = "color"
					elem.id = canID+"_BTN_CHAR_GRAD_TOP";
					elem.value = "#1111ff"
					elem.addEventListener("input",cath);
					spanElem.appendChild(elem);
								// label
					elem = document.createElement("LABEL");
					elem.for = canID+"_BTN_CHAR_GRAD_TOP";
					elem.innerHTML = "-- KOLOR (TOP)"
					spanElem.appendChild(elem);

		// 2. color (wykres MID)
					// span
					spanElem = document.createElement("SPAN");
					document.getElementById(canID+"ssc2").appendChild(spanElem);
								// input color (2)
					elem = document.createElement("INPUT");
					elem.type = "color"
					elem.id = canID+"_BTN_CHAR_GRAD_MID";
					elem.value = "#11ff11"
					elem.addEventListener("input",cath);
					spanElem.appendChild(elem);
								// label
					elem = document.createElement("LABEL");
					elem.for = canID+"_BTN_CHAR_GRAD_MID";
					elem.innerHTML = "-- KOLOR (MID)"
					spanElem.appendChild(elem);

		// 3. color (wykres BOT)
								// span
					spanElem = document.createElement("SPAN");
					document.getElementById(canID+"ssc2").appendChild(spanElem);
								// input color (2)
					elem = document.createElement("INPUT");
					elem.type = "color"
					elem.id = canID+"_BTN_CHAR_GRAD_BOT";
					elem.value = "#ff1111"
					elem.addEventListener("input",cath);
					spanElem.appendChild(elem);
								// label
					elem = document.createElement("LABEL");
					elem.for = canID+"_BTN_CHAR_GRAD_BOT";
					elem.innerHTML = "-- KOLOR (BOT)"
					spanElem.appendChild(elem);

					// subLabel - rozpietosc chart grad
					elem = document.createElement("DIV");
					elem.classList.add("setSubLabels");
					elem.innerHTML = "Rozpiętość / Skupienie"
					document.getElementById(canID+"ssc2").appendChild(elem);
					// slider - rozpietosc chart grad
								// span
					spanElem = document.createElement("SPAN");
					document.getElementById(canID+"ssc2").appendChild(spanElem);
								// slider + parametry
					elem = document.createElement("INPUT");
					elem.id = canID+"_CHART_GRD_SPAN";
					elem.classList.add("slider2");
					elem.type = "range";
					elem.min = "0.01";
					elem.max = "0.49";
					elem.step = "0.01";
					elem.value = "0.25";
					elem.addEventListener("input",cath)
					spanElem.appendChild(elem);

					// subLabel - przezroczystosc chart 
					elem = document.createElement("DIV");
					elem.classList.add("setSubLabels");
					elem.innerHTML = "Przeźroczystość"
					document.getElementById(canID+"ssc2").appendChild(elem);
					// slider - przezroczystosc chart 
								// span
					spanElem = document.createElement("SPAN");
					document.getElementById(canID+"ssc2").appendChild(spanElem);
								// slider + parametry
					elem = document.createElement("INPUT");
					elem.id = canID+"_CHART_GRD_TRANS";
					elem.classList.add("slider2");
					elem.type = "range";
					elem.min = "0.0";
					elem.max = "1.0";
					elem.step = "0.01";
					elem.value = "0.45";
					elem.addEventListener("input",cath)
					spanElem.appendChild(elem);

		// dodatki
		// trzeci subkontener
		elem = document.createElement("DIV");
		elem.classList.add("setSubContainer");
		elem.id = canID+"ssc3";
		mainSetContainer.appendChild(elem);
		// subLabel - DODATKI
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "DODATKI"
		document.getElementById(canID+"ssc3").appendChild(elem);
				
		// Srednia
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #1
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_AVG";
		elem.name = canID+"_SHOW_AVG";
		elem.value = "AVG";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = 1;
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_AVG";
		elem.innerHTML = "Średnia arytmetyczna (AVG)"
		spanElem.appendChild(elem);

		// Srednia RMS
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #2
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_RMS";
		elem.name = canID+"_SHOW_RMS";
		elem.value = "RMS";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = 1;
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_RMS";
		elem.innerHTML = "Średnia kwadratowa (RMS)"
		spanElem.appendChild(elem);

		// Regresja
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #3
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_REGRESSION";
		elem.name = canID+"_SHOW_REGRESSION";
		elem.value = "REG";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = 0;
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_REGRESSION";
		elem.innerHTML = "Regresja liniowa"
		spanElem.appendChild(elem);

		// MIN
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #4
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_MIN";
		elem.name = canID+"_SHOW_MIN";
		elem.value = "MIN";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = 1;
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_MIN";
		elem.innerHTML = "Minimum (MIN)"
		spanElem.appendChild(elem);

		// MIN
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #5
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_MAX";
		elem.name = canID+"_SHOW_MAX";
		elem.value = "MAX";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = "1";
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_MAX";
		elem.innerHTML = "Maksimum (MAX)"
		spanElem.appendChild(elem);

		// Integral
					// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc3").appendChild(spanElem);
					// checkbox #6
		elem = document.createElement("INPUT");
		elem.id = canID+"_SHOW_CMZT";
		elem.name = canID+"_SHOW_CMZT";
		elem.value = "CMZT";
		//elem.classList.add("....");
		elem.type = "checkbox";
		elem.checked = 0;
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);
					// label
		elem = document.createElement("LABEL");
		elem.for = canID+"_SHOW_CMZT";
		elem.innerHTML = "Całka (MZT)"
		spanElem.appendChild(elem);

		// linia/kropki/styl
		// czwarty subkontener
		elem = document.createElement("DIV");
		elem.classList.add("setSubContainer");
		elem.id = canID+"ssc4";
		mainSetContainer.appendChild(elem);
		// subLabel - DODATKI
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Linie/Oznaczenia"
		document.getElementById(canID+"ssc4").appendChild(elem);

		// Linie/kropki
			// span
			spanElem = document.createElement("SPAN");
			document.getElementById(canID+"ssc4").appendChild(spanElem);
						// radio
			elem = document.createElement("INPUT");
			elem.id = canID+"_STYLE_LINE";
			elem.name = canID+"_STYLE";
			elem.value = "LINE";
			//elem.classList.add("....");
			elem.type = "radio";
			elem.checked = 1;
			elem.addEventListener("input",cath)
			spanElem.appendChild(elem);
						// label
			elem = document.createElement("LABEL");
			elem.for = canID+"_STYLE_LINE";
			elem.innerHTML = "Linie"
			spanElem.appendChild(elem);

			// span
			spanElem = document.createElement("SPAN");
			document.getElementById(canID+"ssc4").appendChild(spanElem);
						// radio
			elem = document.createElement("INPUT");
			elem.id = canID+"_STYLE_DOT";
			elem.name = canID+"_STYLE";
			elem.value = "DOT";
			//elem.classList.add("....");
			elem.type = "radio";
			elem.checked = 0;
			elem.addEventListener("input",cath)
			spanElem.appendChild(elem);
						// label
			elem = document.createElement("LABEL");
			elem.for = canID+"_STYLE_DOT";
			elem.innerHTML = "Kropki"
			spanElem.appendChild(elem);

			// span
			spanElem = document.createElement("SPAN");
			document.getElementById(canID+"ssc4").appendChild(spanElem);
						// radio
			elem = document.createElement("INPUT");
			elem.id = canID+"_STYLE_LpD";
			elem.name = canID+"_STYLE";
			elem.value = "LpD";
			//elem.classList.add("....");
			elem.type = "radio";
			elem.checked = 0;
			elem.addEventListener("input",cath)
			spanElem.appendChild(elem);
						// label
			elem = document.createElement("LABEL");
			elem.for = canID+"_STYLE_LpD";
			elem.innerHTML = "Linie + Kropki"
			spanElem.appendChild(elem);

			// grubosc i kolor lini
			elem = document.createElement("DIV");
			elem.classList.add("setSubLabels");
			elem.innerHTML = "Parametry lini"
			document.getElementById(canID+"ssc4").appendChild(elem);
			// span
			spanElem = document.createElement("SPAN");
			document.getElementById(canID+"ssc4").appendChild(spanElem);
			// kolor
			elem = document.createElement("INPUT");
			elem.type = "color"
			elem.id = canID+"CHART_LINE_COL";
			elem.value = "#ff1111"
			elem.style.width = "100%"
			elem.addEventListener("input",cath);
			spanElem.appendChild(elem);
			// grubosc
			elem = document.createElement("INPUT");
			elem.id = canID+"_CHART_LINE_W";
			elem.classList.add("slider2");
			elem.type = "range";
			elem.min = "1";
			elem.max = "10";
			elem.step = "1";
			elem.value = "1";
			elem.addEventListener("input",cath)
			spanElem.appendChild(elem);

		// srednica i kolor kropek
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Parametry znaczników"
		document.getElementById(canID+"ssc4").appendChild(elem);
		// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc4").appendChild(spanElem);
		// kolor
		elem = document.createElement("INPUT");
		elem.type = "color"
		elem.id = canID+"CHART_DOT_COL";
		elem.value = "#11ff11"
		elem.style.width = "100%"
		elem.addEventListener("input",cath);
		spanElem.appendChild(elem);
		// srednica
		elem = document.createElement("INPUT");
		elem.id = canID+"_CHART_DOT_SZ";
		elem.classList.add("slider2");
		elem.type = "range";
		elem.min = "1";
		elem.max = "20";
		elem.step = "1";
		elem.value = "2";
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);

		// piaty subkontener (ogolne paramy)
		elem = document.createElement("DIV");
		elem.classList.add("setSubContainer");
		elem.id = canID+"ssc5";
		mainSetContainer.appendChild(elem);
			// subLabel
		elem = document.createElement("DIV");
		elem.classList.add("setSubLabels");
		elem.innerHTML = "Wysokość wykresu"
		document.getElementById(canID+"ssc5").appendChild(elem);
			// span
		spanElem = document.createElement("SPAN");
		document.getElementById(canID+"ssc5").appendChild(spanElem);
			// grubosc
		elem = document.createElement("INPUT");
		elem.id = canID+"_CHART_HEIGHT";
		elem.classList.add("slider2");
		elem.type = "range";
		elem.min = "100";
		elem.max = "800";
		elem.step = "1";
		elem.value = "500";
		elem.addEventListener("input",cath)
		spanElem.appendChild(elem);

		//zapisz
		elem = document.createElement("BUTTON");
		elem.id = canID+"_SAVE";
		elem.type = "button"
		elem.innerHTML = "ZAPISZ"
		elem.addEventListener("click", function(){
			saveset(canID);
		}, false);
		document.getElementById(canID+"ssc5").appendChild(elem);
	}

	plot (daneY,daneX){
		var ctx = this.canvas.getContext("2d");
		var debug = false;
		var dispType = "dot";
		var lineWidth = 1;
		var lineColor = "#ff2222"
		var dotColor = "#aaff44"
		var dotWidth = 4;

		// autoreg dolnego marginesu
		var labLen;
		if (typeof daneX[daneX.length-1] == Number) labLen = (daneX[daneX.length-1].toFixed(2)).toString();
		else labLen = daneX[daneX.length-1];
		this.chartBordBot = ctx.measureText(labLen).width+20
		//console.log("xNum: "+daneX.length+", last: "+daneX[daneX.length-1]+", eLen: "+daneX[daneX.length-1].length)

		// --- PARAMETRY KONFIGURACJI ---
		// zbieranie parametrow znacznikow/lini
		if (document.getElementById(this.canID+"_STYLE_LINE").checked) dispType="line"
		else if (document.getElementById(this.canID+"_STYLE_DOT").checked) dispType="dot"
		else if (document.getElementById(this.canID+"_STYLE_LpD").checked) dispType="lpd"
		// wyglad lini/znacznika
		lineColor = document.getElementById(this.canID+"CHART_LINE_COL").value;
		lineWidth = document.getElementById(this.canID+"_CHART_LINE_W").value;
		dotColor = document.getElementById(this.canID+"CHART_DOT_COL").value;
		dotWidth = document.getElementById(this.canID+"_CHART_DOT_SZ").value;
		this.canvas.height = document.getElementById(this.canID+"_CHART_HEIGHT").value;
		// gradienty wypelnienia
		var CHART_GRD_TOP = document.getElementById(this.canID+"_BTN_CHAR_GRAD_TOP").value;
		var CHART_GRD_MID = document.getElementById(this.canID+"_BTN_CHAR_GRAD_MID").value;
		var CHART_GRD_BOT = document.getElementById(this.canID+"_BTN_CHAR_GRAD_BOT").value;
		var CHART_GRD_SPAN = document.getElementById(this.canID+"_CHART_GRD_SPAN").value;
		var CHART_GRD_TRANS = document.getElementById(this.canID+"_CHART_GRD_TRANS").value;
		// l/r margines
		var BTN_L_MARGIN_COL = document.getElementById(this.canID+"_BTN_L_MARGIN_COL").value;
		var BTN_B_MARGIN_COL = document.getElementById(this.canID+"_BTN_B_MARGIN_COL").value;
		// grad pod gridem
		var BG_GRD_1 = document.getElementById(this.canID+"_BTN_GRAD_1").value;
		var BG_GRD_2 = document.getElementById(this.canID+"_BTN_GRAD_2").value;
		var BG_GRD_SPAN = document.getElementById(this.canID+"_BG_GRD_SPAN").value;
		// dodatki
		var showAVG = document.getElementById(this.canID+"_SHOW_AVG").checked;
		var showRMS = document.getElementById(this.canID+"_SHOW_RMS").checked;
		var showREG = document.getElementById(this.canID+"_SHOW_REGRESSION").checked;
		var showMIN = document.getElementById(this.canID+"_SHOW_MIN").checked;
		var showMAX = document.getElementById(this.canID+"_SHOW_MAX").checked;
		var showCMZT = document.getElementById(this.canID+"_SHOW_CMZT").checked;
		
		// spolczynniki dla stopni i radianow
		const RAD = 0.01745329251994329576923690768489;
		const DEG = 57.295779513082320876798154814105;
		// charakterystyka danych
		var dataNumElem = daneY.length;
		var dataMIN = Math.min(...daneY);
		var dataMAX = Math.max(...daneY);
		var dataMAXMOD; if (Math.abs(dataMIN)>Math.abs(dataMAX)) dataMAXMOD = Math.abs(dataMIN); else  dataMAXMOD = Math.abs(dataMAX);
		var dataRange = dataMAX-dataMIN;

		var CanW = this.canvas.width;
		var CanH = this.canvas.height;

		var ChartW = this.canvas.width-this.chartBordLeft-this.chartBordRight;
		var ChartH = this.canvas.height-this.chartBordBot;

		var ChartLS = this.chartBordLeft;
		if (window.innerWidth<this.winWidChngParams)
		{
			 ChartLS = this.chartBordLeft/2;
			 ChartW = this.canvas.width-ChartLS-this.chartBordRight;
		}
		else ChartLS = this.chartBordLeft;
		var ChartBS = this.chartBordBot;


		//console.log(daneY)
		//ctx.clearRect(0, 0, CanW, CanH);
		//ctx.fillStyle = "#"+(rcol).toString(16);
		
		ctx.globalAlpha = 1;
		// budowanie gradientu
		var bggrd = ctx.createLinearGradient(0, 0, 0, ChartH);
		bggrd.addColorStop(0, BG_GRD_1);
			bggrd.addColorStop(BG_GRD_SPAN, BG_GRD_1);
		bggrd.addColorStop(0.5, BG_GRD_2);
			bggrd.addColorStop(1-BG_GRD_SPAN, BG_GRD_1);
		bggrd.addColorStop(1, BG_GRD_1);

		// Tlo calosci
		ctx.fillStyle = bggrd;
		ctx.fillRect(0, 0, CanW, CanH);

		// Tlo lewego marginesu
		ctx.fillStyle = BTN_L_MARGIN_COL;
		ctx.fillRect(0, 0, ChartLS, ChartH);

		// Tlo dolnego marginesu
		ctx.fillStyle = BTN_B_MARGIN_COL;
		ctx.fillRect(0, ChartH, CanW, CanH-ChartH);
		ctx.globalAlpha = 1;


// linie podzialow | --

	// --- [  (ChartH/2-20) ] - odsuniecie 20px z gory i dolu dla klarownosci
	// glowny wspolczynnik rozpietosci W wykresu/daneY(max modul)---------poprawic------------------------------------------
	var coefH = (ChartH/2-this.chartTOPBOT_margin)/(dataMAXMOD);
	// glowny wspolczynnik rozpietosci H wykresu/ilosc elem-------------------------------------------
	var coefV = (ChartW/dataNumElem);

	var pivot;  // --- os top/mid/bot
	var zero = 0;
	var czesc ="all";
	// same dodatnie
	if (dataMIN >=0)
	{
		if (dataMAXMOD>dataRange) zero = Math.floor(dataMIN);
		pivot = ChartH;
		coefH = (ChartH-this.chartTOPBOT_margin)/(dataMAXMOD-zero);
		
	}
	// same ujemne
	else if (dataMAX <=0)
	{
		if (dataMAXMOD>dataRange) zero = Math.ceil(dataMAX);
		pivot = 0;
		coefH = (ChartH-this.chartTOPBOT_margin)/(dataMAXMOD+zero);
	}
	// rowny podzial
	else  {pivot= Math.round(ChartH/2-zero); czesc="half" }

	var coefGrid;
	var newHdiv;
	var ile_pod;
	if (czesc=="all") 	{ ile_pod = Math.floor(ChartH/this.labFntSize); }
	else 				{ ile_pod = Math.floor(ChartH/2/this.labFntSize); }
	
	newHdiv = ile_pod;

	 if (czesc=="all")  coefGrid = (ChartH-this.chartTOPBOT_margin)/newHdiv;
	 else 				coefGrid = (ChartH-this.chartTOPBOT_margin*2)/2/newHdiv;

	for (let h=1; h<=newHdiv; h++)
	{
			ctx.beginPath();
					// dodatnie
									ctx.moveTo(0, pivot-coefGrid*h);
				if ( pivot!=0 && h%(2)==0) 		ctx.lineTo(ChartW+ChartLS, pivot-coefGrid*h);

			
				if (h%(4)==0) ctx.strokeStyle = '#aaaaaa'; else ctx.strokeStyle = '#ababab'; 
			
			ctx.lineWidth = 1;
			ctx.globalAlpha = 0.35;
			ctx.stroke();


	}
	// GRIND HORYZONTALNY ----------------------------------------------------------------------------------------------GRID H

	// dostosowywanie rozpietosci dolnych etykiet
	var numSpanV = 1
	if ((this.labFntSize+4)*dataNumElem > ChartW)
	{
		numSpanV = Math.ceil(this.labFntSize*dataNumElem/ChartW)*2
	}
	var	lineSpanV= numSpanV/2
	// GRIND WERTYKALNY ----------------------------------------------------------------------------------------------- GRID V
	for (let w=0; w<dataNumElem; w++)
	{
		ctx.beginPath();

		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = this.LabFont;
		ctx.textAlign = "right";
		ctx.strokeStyle = '#fcfcfc'; 
		ctx.globalAlpha = 0.75;
		
		ctx.rotate(-90*RAD);
		
		if (w%numSpanV==0)
		{
			 ctx.fillText((daneX[w]), -1*(ChartH+10), ChartLS+(ChartW/dataNumElem/2)+(coefV)*w);
		} 
		ctx.rotate(90*RAD);

		ctx.closePath();
		ctx.stroke();
	}

		// etykieta zera , max , min
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";

		ctx.textAlign = "left";
		ctx.font = "14px sans-serif";

		ctx.textAlign = "center";
		
		if (dispType==="line" || dispType==="lpd")
		{
			ctx.beginPath();
			ctx.moveTo(ChartLS, pivot);
			// glowne rysowanie wykresu
			for (var i=0; i<dataNumElem; i++)
			{
				var ccoef = 220/dataMAXMOD
				var hex = hslToHex(120+daneY[i]*ccoef,50,50)
				ctx.fillStyle = hex
				ctx.fillRect(ChartLS+(i)*coefV,ChartH,(ChartW/(dataNumElem+1)),-1*daneY[i]*coefH)
				ctx.fillStyle = "white";
				ctx.fillText((daneY[i]), ChartLS+(i)*coefV+(ChartW/dataNumElem/2), ChartH-daneY[i]*coefH-5);
				//ctx.lineTo(ChartLS+(i)*coefV, pivot-((daneY[i]-zero)*(coefH)));
			}
			//zamknij sciezke w prawym dole

			ctx.strokeStyle = lineColor 
			ctx.lineWidth = lineWidth
			ctx.closePath();
			ctx.stroke();
		}
			
		// chart top/bot margin
		ctx.globalAlpha = 0.18;
		ctx.fillStyle = "black";
		ctx.fillRect(ChartLS, 0, ChartW, this.chartTOPBOT_margin);
		ctx.globalAlpha = 1;


	// srednie --- arytmetyczna --- RMS --- regresja
	if (1){
		ctx.lineWidth = 1;
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "12px sans-serif";
		ctx.textAlign = "right";

	// srednia arytm
		var sr =0;
		if (showAVG)
		{
			for (let i=0; i<dataNumElem; i++)
			{sr+=daneY[i];}
			sr/=dataNumElem;
			var midTXT = "AVG: "+sr.toFixed(4);
			sr-=zero;
		}

	// srednia rms
		var srsqr=0;
		if (showRMS)
		{
			for (let i=0; i<dataNumElem; i++)
			{srsqr+=Math.pow(daneY[i],2);}
			srsqr/=dataNumElem;
			srsqr = Math.sqrt(srsqr);
			var midsqrTXT = "RMS: "+srsqr.toFixed(4);
			srsqr-=zero;
		}

		if (showAVG)
		{
			ctx.beginPath();
			ctx.strokeStyle = "blue"
			ctx.moveTo(ChartLS, pivot-sr*coefH);
			if (pivot-sr*coefH-10<=pivot-srsqr*coefH && pivot-sr*coefH+10>=pivot-srsqr*coefH) ctx.lineTo(ChartW+ChartLS-20-this.chartBordRight-(ctx.measureText(midTXT+1).width), pivot-sr*coefH);
			else ctx.lineTo(ChartW+ChartLS-this.chartBordRight-(ctx.measureText(midTXT+1).width), pivot-sr*coefH);
			ctx.stroke();
		}

		if (showRMS)
		{
			ctx.beginPath();
			ctx.strokeStyle = "green"
			ctx.moveTo(ChartLS, pivot-srsqr*coefH);
			ctx.lineTo(ChartW+ChartLS-this.chartBordRight-(ctx.measureText(midsqrTXT+1).width), pivot-srsqr*coefH);
			ctx.stroke();
		}

		if (showAVG)
		{
			if (pivot-sr*coefH-10<=pivot-srsqr*coefH && pivot-sr*coefH+10>=pivot-srsqr*coefH) ctx.fillText(midTXT, CanW-20-this.chartBordRight-(ctx.measureText(midTXT+1).width), pivot-sr*coefH);
			else ctx.fillText(midTXT, CanW-10-this.chartBordRight, pivot-sr*coefH);
		}

		
		if (showRMS) ctx.fillText(midsqrTXT, CanW-10-this.chartBordRight, pivot-srsqr*coefH);
		

	}	// KONIEC SREDNICH	

		////--------- LOG DEBUG
		if(debug)
		{
			var ctxcon = document.getElementById("bccon");
			ctxcon.innerHTML = test.length + " / MIN: " + dataMIN + " /MAX: " + dataMAX + " / Range: "+ dataRange;
			ctxcon.innerHTML += "<br> Can W: "+CanW+" / Can H: "+CanH + "(cW="+ChartW+" / cH="+ChartH;
			ctxcon.innerHTML += "<br> Najwiekszy MODUL: "+dataMAXMOD+
			" <br> >> Wspolczynnik H "+coefH+
			" <br> >> Wspolczynnik V "+coefV+
			" <br> >> Elementów: "+dataNumElem;
			ctxcon.innerHTML += "<br> Pozycja pivotu: "+pivot+"px";
			if (showREG)ctxcon.innerHTML += "<br> REGRESJA -- a= "+RegCoefs.a.toFixed(2)+" / b= "+RegCoefs.b.toFixed(2);
			let height = window.innerHeight;
			let width = window.innerWidth;
			ctxcon.innerHTML += "<br> Window:: H: "+height+" / W: "+width;
			ctxcon.innerHTML += "<br> ZERO: "+zero+" -- scaler/newHdiv: "+scaler+" / "+newHdiv;
			ctxcon.innerHTML += "<br> GRID_coef: "+coefGrid
		}

	} //---plot
}



