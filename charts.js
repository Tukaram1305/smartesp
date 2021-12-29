window.addEventListener('resize', reportWindowSize);

function reportWindowSize() {
	console.log("e resize W: "+window.innerHeight+" / H: window.innerWidth");
	var adjWinW = window.innerWidth-80;
	bigChart.adjustWindowChartW(adjWinW);
}

class markCharts
{
	constructor(canID)
	{
		this.canvas = document.getElementById(canID);
		this.chartBordLeft = 100;
		this.chartBordBot = 100;

		this.HDivisions = 5;
		this.VDivisions = 4;

		this.dispType = "dot";
		
		this.chartBGcol = "#ffffff";
		this.leftMarginCol ="#222222";
		this.bottomMarginCol ="#333333";

		//paramy gridu
		this.BG_GRAD_C1 = "#212121";
		this.BG_GRAD_C2 = "#212121";
		this.C1_BG_GRDSPAN1 = 0.25;
		this.innerBorder = 10;

		//paramy grd+span chartu
		this.CHART_GRD_TOP = "red";
		this.CHART_GRD_MID = "green";
		this.CHART_GRD_BOT = "blue";
		this.CHART_GRD_SPAN = 0.35;
		this.CHART_GRD_TRANS = 0.5;

		//this.canvas.height = 400;
		//FONTY
		this.labFntName = "sans-serif"
		this.labFntSize = 12
		this.LabFont = this.labFntSize+"px "+this.labFntName;
		console.log(this.LabFont)
		
		//this.canvas.width = this.canvas.width/1.2;
		//this.canvas.height = this.canvas.height/1.2;
	}

	btn(canID) {
		var btn1 = document.createElement("INPUT");
		btn1.type = "color"
		//btn1.innerHTML = "<p> nowy </p>";
		btn1.addEventListener("input",this.setBG(btn1.value,"#aaaaaa","dddddd"))
		//btn1.classList.add("elem");
		document.getElementById("bttest").appendChild(btn1);
	}
	
	adjustWindowChartW(adjWinW)
	{
		this.canvas.width = Math.min(adjWinW,1400);
	}

	setBGspan(grd1)
	{
		//console.log("F G: "+grd1+"  Typ:"+typeof grd1+ "  finite?: "+isFinite(grd1))
		//console.log("F Stala: "+0.25+"  Typ:"+typeof 0.25+ "  finite?: "+isFinite(0.25))
		this.C1_BG_GRDSPAN1 = grd1;
	}
	
	setBG(col1,col2)
	{
		this.BG_GRAD_C1= col1;
		this.BG_GRAD_C2 = col2;

	}

	setChartDispParams(c1,c2,c3,cg1,ct1)
	{
		this.CHART_GRD_TOP = c1;
		this.CHART_GRD_MID = c2;
		this.CHART_GRD_BOT = c3;
		this.CHART_GRD_SPAN = cg1;
		this.CHART_GRD_TRANS = ct1;
	}

	calkaMZT(dane)
	{
		var nums = dane.length;
		//console.log("NUMS: "+nums)
		var sum=0.0;
		for (let i=1; i<nums; i++)
		{
			sum+=(dane[i]+dane[i-1])*0.5;
		}
		return ((sum));
	}

	regresja(dane)
	{
		var a = 0;  var b = 0;  var arY = [];
		var nums = dane.length;
		for (let i=0; i<nums; i++) { arY[i] = i; a+=dane[i]; b+=i; }
		a/=nums; b/=nums;
		var aX = [];  var bX = [];
		var iloczyn = [];  var sumIlo = 0;  var potega = [];  var sumPoteg = 0;
		for (let i=0; i<nums; i++)
			{aX[i]=dane[i]-a;
			bX[i]=arY[i]-b;
			iloczyn[i] = aX[i]*bX[i];
			sumIlo+=iloczyn[i];
			potega[i]=Math.pow(aX[i],2);
			sumPoteg+=potega[i];}
		var coefA = sumIlo/sumPoteg; var coefB = b-(a*sumIlo/sumPoteg); var rCf = {a:coefA,b:coefB};
		return rCf;
	}

	plot (dane,daneX){
		var debug = false;
		// spolczynniki dla stopni i radianow
		const RAD = 0.01745329251994329576923690768489;
		const DEG = 57.295779513082320876798154814105;
		var dataNumElem = dane.length;
		var dataMIN = Math.min(...dane);
		var dataMAX = Math.max(...dane);
		var dataMAXMOD; if (Math.abs(dataMIN)>Math.abs(dataMAX)) dataMAXMOD = Math.abs(dataMIN); else  dataMAXMOD = Math.abs(dataMAX);
		var dataRange = dataMAX-dataMIN;

		var attenuation = 1;
		var CanW = this.canvas.width;
		var CanH = this.canvas.height;

		var ChartW = this.canvas.width-this.chartBordLeft;
		var ChartH = this.canvas.height-this.chartBordBot;

		var ChartLS = this.chartBordLeft;
		if (window.innerWidth<1080)
		{
			 ChartLS = this.chartBordLeft/2;
			 ChartW = this.canvas.width-ChartLS;
		}
		else ChartLS = this.chartBordLeft;
		var ChartBS = this.chartBordBot;

		// --- [  (ChartH/2-20) ] - odsuniecie 20px z gory i dolu dla klarownosci
		// glowny wspolczynnik rozpietosci W wykresu/dane(max modul)---------------------------------------------------
		var coefH = (ChartH/2-20)/(dataMAXMOD);
		// glowny wspolczynnik rozpietosci H wykresu/ilosc elem--------------------------------------------------------
		var coefV = (ChartW+(ChartW/dataNumElem))/dataNumElem;

		var bordL = this.chartBordLeft;
		var prescaler = 1;
		
		//console.log(dane)
		var ctx = this.canvas.getContext("2d");

		ctx.globalAlpha = 1;
		//ctx.clearRect(0, 0, CanW, CanH);
		//ctx.fillStyle = "#"+(rcol).toString(16);
		
		ctx.globalAlpha = 1;
		// gradienty
		var bggrd = ctx.createLinearGradient(0, 0, 0, ChartH);
		bggrd.addColorStop(0, this.BG_GRAD_C1);
			bggrd.addColorStop(this.C1_BG_GRDSPAN1, this.BG_GRAD_C1);
		bggrd.addColorStop(0.5, this.BG_GRAD_C2);
			bggrd.addColorStop(1-this.C1_BG_GRDSPAN1, this.BG_GRAD_C1);
		bggrd.addColorStop(1, this.BG_GRAD_C1);

		var lmgrd = ctx.createLinearGradient(0, 0, ChartLS, 0);
		lmgrd.addColorStop(0, "#004594");
		lmgrd.addColorStop(1, "#052952");

		var bmgrd = ctx.createLinearGradient(0, ChartH, 0, CanH);
		bmgrd.addColorStop(0, "#052952");
		bmgrd.addColorStop(1, "#004594");

		// Tlo calosci
		//ctx.fillStyle = this.chartBGcol;
		ctx.fillStyle = bggrd;
		ctx.fillRect(0, 0, CanW, CanH);

		// Tlo lewego marginesu
		//ctx.fillStyle = this.leftMarginCol;
		ctx.fillStyle = lmgrd;
		ctx.fillRect(0, 0, ChartLS, ChartH);

		// Tlo dolnego marginesu
		//ctx.fillStyle = this.bottomMarginCol;
		ctx.fillStyle = bmgrd;
		ctx.fillRect(ChartLS, ChartH, ChartW, CanH);
		ctx.globalAlpha = 1;

		// obramowka wlasciwego wykresu
		/*
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.lineWidth = "3";
		ctx.strokeStyle = "#ffffff";
		ctx.rect(ChartLS,2,ChartW-2,ChartH-4);
		ctx.stroke();*/

// linie podzialow | --

	var scaler = 1;
	var HDiv = dataMAXMOD;
	if (dataMAXMOD<10) {HDiv = dataMAXMOD*4; scaler =4;}
	// ox0
	var new0 = Math.round(ChartH/2);

	// bazowy line i num span
	var numSpan = 1;
	var lineSpan = 1;

	// autoregulacja spanu
	if (false)
	{
	if (dataMAXMOD<=10) {numSpan = 1; lineSpan = 1;}
	else if (dataMAXMOD>10 && dataMAXMOD<=50) {numSpan = 2; lineSpan = 2;}
	else if (dataMAXMOD>50 && dataMAXMOD<=150) {numSpan = 8; lineSpan = 8;}
	else if (dataMAXMOD>150 && dataMAXMOD<=500) {numSpan = 42; lineSpan = 42;}
	else if (dataMAXMOD>500 && dataMAXMOD<=2000) {numSpan = 92; lineSpan = 92;}
	else {	numSpan = parseInt(dataMAXMOD/16,10);
			lineSpan= parseInt(dataMAXMOD/10,10);}
	}

	//var spcoef = Math.log(dataMAXMOD);
	//console.log("LN: "+spcoef);
	numSpan = parseInt(dataMAXMOD/(0.5*Math.sqrt(dataMAXMOD*0.5)));
	lineSpan= parseInt(dataMAXMOD/(0.5*Math.sqrt(dataMAXMOD)));
	console.log("NUM SPAN: "+numSpan)

	// GRIND HORYZONTALNY ----------------------------------------------------------------------------------------------GRID V
	for (let h=1; h<=HDiv; h++)
	{
			ctx.beginPath();
				ctx.moveTo(0, new0-coefH*h/scaler);
				if (h%lineSpan==0) ctx.lineTo(ChartW+ChartLS, new0-coefH*h/scaler);
				ctx.moveTo(0, new0+coefH*h/scaler);
				if (h%lineSpan==0) ctx.lineTo(ChartW+ChartLS, new0+coefH*h/scaler);
			if (h%(lineSpan*2)==0) ctx.strokeStyle = '#dfdfdf'; else ctx.strokeStyle = '#ababab'; 
			ctx.lineWidth = 1;
			ctx.globalAlpha = 0.4;
			ctx.stroke();

			// etykiety
			ctx.beginPath();
			ctx.globalAlpha = 1;
			ctx.font = "10px sans-serif";
			ctx.textAlign = "right";
			
			let m;
			if (h%(numSpan*2)==0 && (window.innerWidth>=1080)) m = 90;
			else m=40;
			
			ctx.fillStyle = "white";
			if (h%numSpan==0) ctx.fillText((h/scaler).toFixed(1), m, new0-coefH*h/scaler);
			ctx.fillStyle = "yellow";
			if (h%numSpan==0) ctx.fillText((-h/scaler).toFixed(1), m, new0+coefH*h/scaler);
			ctx.fillStyle = "white";

			ctx.closePath();
	}

	var numSpanV = parseInt(dataNumElem/coefV);
	var	lineSpanV= Math.max(parseInt(dataNumElem/coefV/2),1); //console.log("Coef lini: "+lineSpanV);
	// GRIND WERTYKALNY
	for (let w=0; w<dataNumElem; w++)
	{
		if (w%lineSpanV==0)
		{
			ctx.moveTo(((ChartLS)+coefV*w),0);
			ctx.lineTo(((ChartLS)+coefV*w),ChartH+10);
		}
		//ctx.lineTo(((ChartLS)+coefV*w-70),ChartH+45);
		ctx.strokeStyle = '#fcfcfc'; 
		ctx.lineWidth = 1;
		ctx.globalAlpha = 0.1;
		ctx.stroke();
		ctx.beginPath();

		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "12px sans-serif";
		ctx.textAlign = "right";
		ctx.strokeStyle = '#fcfcfc'; 
		ctx.globalAlpha = 0.75;
		
		var dzisiaj = new Date();
		var date = dzisiaj.getDate()+'/'+(dzisiaj.getMonth()+1)+'/'+dzisiaj.getFullYear();
		var time = dzisiaj.getHours() + ":" + dzisiaj.getMinutes() + ":" + dzisiaj.getSeconds();
		//if (w%numSpan==0) 
		ctx.rotate(-90*RAD);
		//ctx.fillText(DATE.getMilliseconds()/10, ChartLS+15+(coefV)*w, ChartH+40);
		if (w%numSpanV==0) ctx.fillText((daneX[w]*DEG).toFixed(2), -1*(ChartH+10), ChartLS+5+(coefV)*w);
		ctx.rotate(90*RAD);
		//console.log("Pozycja yT:("+w+") x["+nnn+"] y["+mmm+"]");

		ctx.closePath();
		ctx.stroke();
	}

		// wartosc i linia x0
		ctx.beginPath();
		ctx.moveTo(0,new0);
		ctx.lineTo(ChartW+ChartLS,new0);
		ctx.strokeStyle = '#ff4444'; 
		ctx.lineWidth = 2;
		ctx.globalAlpha = 0.5;
		ctx.stroke();
		// etykieta zera , max , min
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "12px sans-serif";
		ctx.fillText("0", CanW-10, new0);
		
		ctx.textAlign = "left";
		ctx.fillText("Max: "+dataMAX, ChartLS+5, 20);
		ctx.fillText("Min: "+dataMIN, ChartLS+5, ChartH-10);

	
		// logo/calka
		ctx.textAlign = "left";
		ctx.font = "14px sans-serif";
		var calk = this.calkaMZT(dane);
		ctx.fillStyle = "red";
		ctx.fillText("Paweł", 10, ChartH+20);
		ctx.fillText("Markowiak", 10, ChartH+36);

		ctx.fillStyle = "white";
		ctx.fillText("CałkaMZT>", 10, ChartH+56);
		ctx.fillText(calk.toFixed(4), 10, ChartH+72);

		ctx.textAlign = "right";


		// wykres (dane - jako argument tablica[100])
		//ctx.beginPath();
		ctx.lineJoin = "round"; // bevel round miter
		
		ctx.moveTo(ChartLS, new0);
		// glowne rysowanie wykresu
		for (var i=0; i<dataNumElem; i++)
		{
			if (this.dispType==="dot") ctx.lineTo(ChartLS+(i)*coefV, new0-(dane[i]*(coefH)));

			if (this.dispType==="dotx") 
			{ctx.beginPath();
			ctx.arc(ChartLS+i*coefV,new0-(dane[i]*(coefH)),4,0,2*Math.PI);
			ctx.fillStyle = "#11ff22"
			ctx.fill();}
		}
		//zamknij sciezke w prawym dole
		ctx.lineTo(CanW,new0);
		ctx.strokeStyle = "#ff151c"; 
		ctx.lineWidth = 1;
		ctx.closePath();
		ctx.stroke();


		// wypelnij (gradienty+span)
		if (true)
		{
			var grd = ctx.createLinearGradient(0, 0, 0, ChartH);
			grd.addColorStop(0, this.CHART_GRD_TOP);
			grd.addColorStop(this.CHART_GRD_SPAN, this.CHART_GRD_TOP);
			grd.addColorStop(0.5, this.CHART_GRD_MID);
			grd.addColorStop(1-this.CHART_GRD_SPAN, this.CHART_GRD_BOT);
			grd.addColorStop(1, this.CHART_GRD_BOT);

			ctx.globalAlpha = this.CHART_GRD_TRANS;
			//ctx.fillStyle = "#ff151c";
			ctx.fillStyle = grd;
			ctx.fill();
		}
			
	// srednie --- arytmetyczna --- RMS --- regresja
	if (1){
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "12px sans-serif";

		var sr =0;
		var srsqr=0;
		for (let i=0; i<dataNumElem; i++)
		{
			sr+=dane[i];
			srsqr+=Math.pow(dane[i],2);
		}
		sr/=dataNumElem;
		srsqr/=dataNumElem;
		srsqr = Math.sqrt(srsqr);
		var midTXT = "AVG: "+sr.toFixed(4);
		var midsqrTXT = "RMS: "+srsqr.toFixed(4);

		ctx.beginPath();
		ctx.strokeStyle = "blue"
		ctx.moveTo(ChartLS, new0-sr*coefH);
		if (new0-sr*coefH-10<=new0-srsqr*coefH && new0-sr*coefH+10>=new0-srsqr*coefH) ctx.lineTo(ChartW+ChartLS-20-(ctx.measureText(midTXT+1).width), new0-sr*coefH);
		else ctx.lineTo(ChartW+ChartLS-(ctx.measureText(midTXT+1).width), new0-sr*coefH);
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "green"
		ctx.moveTo(ChartLS, new0-srsqr*coefH);
		ctx.lineTo(ChartW+ChartLS-(ctx.measureText(midsqrTXT+1).width), new0-srsqr*coefH);
		ctx.stroke();

		if (new0-sr*coefH-10<=new0-srsqr*coefH && new0-sr*coefH+10>=new0-srsqr*coefH) ctx.fillText(midTXT, CanW-20-(ctx.measureText(midTXT+1).width), new0-sr*coefH);
		else ctx.fillText(midTXT, CanW-10, new0-sr*coefH);
		ctx.fillText(midsqrTXT, CanW-10, new0-srsqr*coefH);
		

				// Regresja liniowa
				var RegCoefs = this.regresja(dane);
				//console.log("a: "+RegCoefs.a+" / b: "+RegCoefs.b);
				ctx.beginPath();
				ctx.setLineDash([15, 8]);

				ctx.moveTo(ChartLS,new0-(RegCoefs.b*coefH));
				ctx.lineTo(ChartW+ChartLS,new0-((RegCoefs.a*(dataNumElem-1) + RegCoefs.b)*coefH));
				ctx.strokeStyle = "yellow"
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.setLineDash([]);
				ctx.beginPath();
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
			ctxcon.innerHTML += "<br> Wartosc w x0: "+new0;
			ctxcon.innerHTML += "<br> REGRESJA -- a= "+RegCoefs.a.toFixed(2)+" / b= "+RegCoefs.b.toFixed(2);
			let height = window.innerHeight;
			let width = window.innerWidth;
			ctxcon.innerHTML += "<br> Window:: H: "+height+" / W: "+width;
	
		}

	} //---plot
	
	
}
var test = [];
var testY = [];
//for (let i=0; i<20; i++) test[i] = Math.round(Math.random()*40-20);
for (let i=0; i<51; i++) test[i] = Math.round(Math.random()*50-20);
for (let i=0; i<51; i++) testY[i] = i;
var bigChart = new markCharts("bigCan");
bigChart.setBG("#212121","#111122","#221111")
bigChart.plot(test,testY);
//bigChart.btn("bigCan");


if (1){
var rr = 0.0;
var iter =0;
var MAGNITUDE = 1.0;
setInterval(function(){
	iter++;
	if (iter%100==0) {MAGNITUDE = Math.random()*0.1; }
	test[50] = (Math.round(MAGNITUDE*7.3*Math.sin(rr*0.07556)))*(Math.round(MAGNITUDE*100*Math.sin(4*rr)))+(Math.round(MAGNITUDE*500*Math.sin(0.05*rr)))+(Math.round(25*Math.sin(2*rr))+(Math.round(MAGNITUDE*700*Math.sin(2.33333*rr)))+(Math.round(MAGNITUDE*442*Math.sin(7.5*rr))));
	//test[50] = 4;
	testY[50] = rr;
	rr+=0.025;
	//rr+=1;
	if (rr>=2*Math.PI) rr=0;
	for (let i=1; i<51; i++) {test[i-1]=test[i]; testY[i-1]=testY[i];}
	bigChart.plot(test,testY);
},50);
}

function updateSettings()
{
	// bg grid
	var a = document.getElementById("C1_BG1").value;
	var b = document.getElementById("C1_BG2").value;
	var c = document.getElementById("C1_BG_GRDSPAN1").value;

	//chard grad + span + trans
	c1 = document.getElementById("C1_CHARTGRAD_TOP").value;
	c2 = document.getElementById("C1_CHARTGRAD_MID").value;
	c3 = document.getElementById("C1_CHARTGRAD_BOT").value;
	cg1 = document.getElementById("C1_CHART_GRAD_SPAN").value;
	ct1 = document.getElementById("C1_CHART_GRAD_TRANS").value;

	bigChart.setBG(a,b);
	bigChart.setBGspan(c);
	bigChart.setChartDispParams(c1,c2,c3,cg1,ct1);
}

// Funkcja wysyła zebrana konfiguracje do PHP [POST] do zapisania
function saveSettings()
{
	var setJson = {}
	var BH_V1 = document.getElementById("C1_BG1").value;
	var BH_V2 = document.getElementById("C1_BG2").value;
	var BH_GRDSPAN = document.getElementById("C1_BG_GRDSPAN1").value;

	var BH_CHART_GRAD_TOP = document.getElementById("C1_CHARTGRAD_TOP").value;
	var BH_CHART_GRAD_MID = document.getElementById("C1_CHARTGRAD_MID").value;
	var BH_CHART_GRAD_BOT = document.getElementById("C1_CHARTGRAD_BOT").value;
	var BH_CHART_GRAD_SPAN = document.getElementById("C1_CHART_GRAD_SPAN").value;
	var BH_CHART_GRAD_TRANS = document.getElementById("C1_CHART_GRAD_TRANS").value;

	setJson.BG_GRD_1 = BH_V1;
	setJson.BG_GRD_2 = BH_V2;
	setJson.BG_GRD_SPAN = BH_GRDSPAN;

	setJson.CHRT_GRD_TOP = BH_CHART_GRAD_TOP;
	setJson.CHRT_GRD_MID = BH_CHART_GRAD_MID;
	setJson.CHRT_GRD_BOT = BH_CHART_GRAD_BOT;
	setJson.CHRT_GRD_SPAN = BH_CHART_GRAD_SPAN;
	setJson.CHRT_GRD_TRANS = BH_CHART_GRAD_TRANS;


	console.log("Zaladowalem ustawienia: ")
	for (const [key, value] of Object.entries(setJson)) {
		console.log(`${key}: ${value}`);
	}

	// parsuj ustawienia na string
	var strJson = (JSON.stringify(setJson));
	console.log(strJson)

	var xhr = new XMLHttpRequest();

			//HTTPReq
			xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { console.log("Response: "+xhr.responseText); } }		
			xhr.open("POST", "../smartesp/saveSettings.php");
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("sJson="+encodeURIComponent(strJson));
}	


// Glowna funkcja zbierajaca dane kofiguracji do zapisania
function aquireSettings()
{
	var xhr = new XMLHttpRequest();
		//HTTPReq
		xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var mJson = JSON.parse(this.responseText);
			
			console.log("Zaladowalem ustawienia: ")
			for (const [key, value] of Object.entries(mJson)) {
				console.log(`${key}: ${value}`);
			  }
			document.getElementById("C1_BG1").value = mJson.BG_GRD_1;
			document.getElementById("C1_BG2").value = mJson.BG_GRD_2;
			document.getElementById("C1_BG_GRDSPAN1").value = mJson.BG_GRD_SPAN;

			document.getElementById("C1_CHARTGRAD_TOP").value = mJson.CHRT_GRD_TOP;
			document.getElementById("C1_CHARTGRAD_MID").value = mJson.CHRT_GRD_MID;
			document.getElementById("C1_CHARTGRAD_BOT").value = mJson.CHRT_GRD_BOT;
			document.getElementById("C1_CHART_GRAD_SPAN").value = mJson.CHRT_GRD_SPAN;
			document.getElementById("C1_CHART_GRAD_TRANS").value = mJson.CHRT_GRD_TRANS;
			updateSettings();
			}
		};
		xhr.open("GET", "../smartesp/aquireSettings.php", true);
		xhr.send();		

}

////////// stare
class rysowanie
{
	constructor(baund,canID)
	{
		this.baund = baund;
		this.canvas = document.getElementById(canID);
		//this.test = "tu test";
	}
	draw (dane){
		//console.log(dane)
		//var baund=40;
		//var canvas = document.getElementById("myCan");
		var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		//ctx.fillStyle = "#"+(rcol).toString(16);
		ctx.fillStyle = "#222222";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		// obramowka wlasciwego wykresu
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.lineWidth = "1";
		ctx.strokeStyle = "red";
		ctx.rect(this.baund,this.baund,this.canvas.width-2*this.baund,this.canvas.height-2*this.baund);
		ctx.stroke();
		// grid
		ctx.beginPath();
		var CW = this.canvas.width-2*this.baund;
		var CH = this.canvas.height-2*this.baund;
		for (var j=0; j<10; j++)
		{
			// horyzontalne
			ctx.moveTo(this.baund,(CH/10*j)+this.baund);
			ctx.lineTo(CW+this.baund,(CH/10*j)+this.baund);
			// wertykalne
			ctx.moveTo((CW/10*j)+this.baund,this.baund);
			ctx.lineTo((CW/10*j)+this.baund,CH+this.baund);
		}
		ctx.strokeStyle = "#dddddd"; 
		ctx.lineWidth = 0.5;
		ctx.globalAlpha = 0.2;
		ctx.stroke();

		// wykres (dane - jako argument tablica[100])
		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.moveTo(0,this.canvas.height);
		for (var i=0; i<100; i++)
		{
			ctx.lineTo(i*this.canvas.width/100,this.canvas.height/2+dane[i]);
		}
		//zamknij sciezke w prawym dole
		ctx.lineTo(this.canvas.width,this.canvas.height);
		ctx.strokeStyle = "#ff151c"; 
		ctx.lineWidth = 1;
		
		ctx.closePath();
		ctx.stroke();
		ctx.globalAlpha = 0.45;
		ctx.fillStyle = rcol;
		ctx.fill();

		// wykres - COS
		ctx.beginPath();
		ctx.lineJoin = "round";
		ctx.moveTo(0,this.canvas.height);
		for (var i=0; i<100; i++)
		{
			ctx.lineTo(i*this.canvas.width/100,this.canvas.height/2+tab2[i]);
		}
		//zamknij sciezke w prawym dole
		ctx.lineTo(this.canvas.width,this.canvas.height);
		ctx.strokeStyle = "#0d09f1"; 
		ctx.lineWidth = 1;
		
		ctx.closePath();
		ctx.stroke();
		ctx.globalAlpha = 0.45;
		ctx.fillStyle = "#1e9432";

		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.rotate(90 * Math.PI / 180);
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.font = "14px sans-serif";
		ctx.fillText("SIN:"+(Math.sin(SINX)).toPrecision(2), 10, -10);
		ctx.closePath();
		ctx.rotate(-90 * Math.PI / 180);
	}
	
	
}


var tab = Array(100);
var tab2 = Array(100);
var rys = new rysowanie(10,"myCan");
var SINX = 0;

var GLOBAL_FPS = 60;

/*
setInterval(
	function (){
		
		tab[100] =( Math.sin(SINX)+2/3*Math.sin(0.77*SINX))*40;
		tab2[100] =( Math.cos(SINX)+Math.cos(1/2*SINX))*40;
		SINX+=0.1;
		for (var i=1; i<=100; i++)
		{
			tab[i-1]=tab[i];
			tab2[i-1]=tab2[i];
		}

		rys.draw();
	},10
	
);
*/
function rysujWykres(timestamp){
	
	const FPS = GLOBAL_FPS;
	//console.log(FPS);
	setTimeout(function(){

		tab[99] =( Math.sin(SINX)+5*Math.sin(1.5*SINX))*20;
		tab2[99] =( Math.cos(SINX)+Math.cos(1/2*SINX))*40;
		SINX+=0.1;
		for (var i=1; i<100; i++)
		{
			tab[i-1]=tab[i];
			tab2[i-1]=tab2[i];
		}

		rys.draw(tab);

		requestAnimationFrame(rysujWykres);
	},Math.round(1000/FPS));
};
// inwokuj rysowanie wykresu
requestAnimationFrame(rysujWykres);
var timestamp = Date.now();
//rysujWykres(timestamp);

var rcol = "#FFCC00"; // bazowy kolor pod wykresem
function updRangeCol()
{
	var RangeCol = document.getElementById("sd2");
	rcol = RangeCol.value;
	RGBArr = HEXtoRGB(rcol);
	document.getElementById("val1").innerHTML = rcol +
	" <br> R: "+RGBArr[0] + " G: "+RGBArr[1]+" B: "+RGBArr[2];
}