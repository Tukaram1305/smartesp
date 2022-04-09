class dial
{
	constructor(CANDIAL)
	{
		this.canvas = document.getElementById(CANDIAL);
		this.ctx = this.canvas.getContext("2d");
		this.W = this.canvas.width;
		this.H = this.canvas.height;
		this.kat = 0;
		this.vv = {x:2, y:3}; // ???
		this.iter = 0;
	}
	draw ()
	{
		var dlg = 150;
		this.kat+=0.1;
		var katRad = this.kat*0.01745329251994329576923690768489;
		var SX = Math.sin(katRad);
		var CX = Math.cos(katRad);
		this.iter++;
		if (this.iter%36000==0)
		{
		this.ctx.beginPath();
		this.ctx.clearRect(0,0,this.W,this.H);
		this.ctx.stroke();	
		}

		for (let i=0; i<this.W/2; i++)
		{
			this.ctx.beginPath();
			this.ctx.moveTo(i*2,0)
			this.ctx.lineTo(i*2,this.H)
			this.ctx.strokeStyle = hslToHex(i/4,80,50);
			//console.log(this.iter%100)
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
		}

	}
}

function BGFX_CREATE ()
{
	var canvas = document.getElementById("BGCAN")
	canvas.style.width='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	var WW = window.innerWidth
	var WH = window.innerHeight
	console.log("W: "+WW+" / H: "+WH)

	var ctx = document.getElementById("BGCAN").getContext("2d");
	ctx.fillStyle = hslToHex(Math.round(Math.random()*360),50,50)
	ctx.globalAlpha = 1
	//ctx.fillRect(0,0,WW,WH)
	for (let i=0; i<WW; i++)
	{
		ctx.beginPath()
		ctx.fillStyle = hslToHex(i/7,50,50)
		ctx.fillRect(0,0,WW-i,WH-i/2)
	}
	for (let i=0; i<Math.round(Math.random()*500); i++)
	{
		ctx.globalAlpha = Math.random()
		ctx.beginPath()
		ctx.fillStyle = hslToHex(Math.round(Math.random()*360),50,50)
		ctx.fillRect(Math.round(Math.random()*WW),Math.round(Math.random()*WH),Math.round(Math.random()*100),Math.round(Math.random()*100))
	}
	/*
	ctx.globalAlpha = 0.15
	for (let i=0; i<Math.floor(WW/12); i++)
	{
		ctx.beginPath()
		ctx.strokeStyle = hslToHex(Math.round(Math.random()*360),50,50)
		ctx.lineWidth = 6
		ctx.moveTo(Math.round(Math.random()*WW),WH)
		ctx.lineTo(i*16,0)
		ctx.stroke()
	}*/

}
//setInterval(BGFX_CREATE,1000)
 /*
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
*/


//var dial1 = new dial("BG");
//dial1.draw()
//setInterval(dial1.draw(),50)



window.addEventListener("load", function() {
  httpGetData(); httpChkEspStatus(); httpCheckESPRSSI();
});

var KONSOLA = document.getElementById("konsola");

var ESP_IP = "192.168.1.35";
var IP = document.getElementById("esp_ip");
var IP_LOG = document.getElementById("current_ip");

IP.addEventListener("input",function(){
	ESP_IP = $("#esp_ip").val();
	IP_LOG.innerHTML = ESP_IP;
});

function HEXtoRGB(hex)
{
	var vRGB = hex.replace('#','');
	var RGBVAL = parseInt(vRGB,16);
	var RGBArr = [];
	RGBArr[0] = RGBVAL >> 16; 
	RGBArr[1] = RGBVAL >> 8 & 255;
	RGBArr[2] = RGBVAL & 255;
	return RGBArr;
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); 
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function reportWindowSize(chart) {
	var adjWinW = window.innerWidth-100;
	chart.adjustWindowChartW(adjWinW);
	chart.plot(dataY,dataX);
}

function getJSdateTime()
{
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
		var sqlDTFormat = currDate+"T"+currTime
		return sqlDTFormat;
}

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
			}
			xhr.open("POST", "../smartesp/getChartDataFromDB.php", false);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					//HTTPReq
					xhr.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
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

function getDataFromDB(dtype)
{
	var xhr = new XMLHttpRequest();
	var sendReq = "sensorType="+dtype;
	var unit = ""
	if (dtype=="Temperature") unit = " &#176;C";
	else if (dtype=="Pressure") unit = " hPa";
	else if (dtype=="Humidity") unit = " %";
	//console.log("SensorReq: "+sendReq)
	xhr.open("POST", "../smartesp/getTabDataFromDB.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log("RES: "+this.responseText);
				mJson = JSON.parse(this.responseText);
				var subTsStyleMin = "\"font-size:16px; color: #b9b6de; text-shadow:none;\"";
				var subTsStyleMax = "\"font-size:16px; color: #ffd9da; text-shadow:none;\"";
				var subTsStyleAvg = "\"font-size:16px; color: #353535; text-shadow:none;\"";
				
				var aUP = "<img src='img/arrUp.png' width='30'/>"
				var aDOWN = "<img src='img/arrDown.png' width='30'/>"
				var aEQ = "=="
				
				$("#t0_n").html(mJson.minHour.MIN+unit+(parseFloat(mJson.minHour.MIN) > parseFloat(mJson.minDay.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minHour.TS+"</span>");
				$("#t0_x").html(mJson.maxHour.MAX+unit+(parseFloat(mJson.maxHour.MAX) > parseFloat(mJson.maxDay.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxHour.TS+"</span>");
				$("#t0_g").html(mJson.avgHour.AVG+unit+(parseFloat(mJson.avgHour.AVG) > parseFloat(mJson.avgDay.AVG) ? aUP : aDOWN ));
				$("#th0").html("Ostatnia godzina<br><span style="+subTsStyleAvg+">Z ( "+mJson.HourNums.ILE+" ) Rekordów</span>");

				$("#t1_n").html(mJson.minDay.MIN+unit+(parseFloat(mJson.minDay.MIN) > parseFloat(mJson.minWeek.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minDay.TS+"</span>");
				$("#t1_x").html(mJson.maxDay.MAX+unit+(parseFloat(mJson.maxDay.MAX) > parseFloat(mJson.maxWeek.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxDay.TS+"</span>");
				$("#t1_g").html(mJson.avgDay.AVG+unit+(parseFloat(mJson.avgDay.AVG) > parseFloat(mJson.avgWeek.AVG) ? aUP : aDOWN ));
				$("#th1").html("Ostatnie 24 godziny<br><span style="+subTsStyleAvg+">Z ( "+mJson.DayNums.ILE+" ) Rekordów</span>");

				$("#t2_n").html(mJson.minWeek.MIN+unit+(parseFloat(mJson.minWeek.MIN) > parseFloat(mJson.minMonth.MIN) ? aUP : aDOWN )+"<br><span style="+subTsStyleMin+">"+mJson.minWeek.TS+"</span>");
				$("#t2_x").html(mJson.maxWeek.MAX+unit+(parseFloat(mJson.maxWeek.MAX) > parseFloat(mJson.maxMonth.MAX) ? aUP : aDOWN )+"<br><span style="+subTsStyleMax+">"+mJson.maxWeek.TS+"</span>");
				$("#t2_g").html(mJson.avgWeek.AVG+unit+(parseFloat(mJson.avgWeek.AVG) > parseFloat(mJson.avgMonth.AVG) ? aUP : aDOWN ));
				$("#th2").html("Ostatni tydzień<br><span style="+subTsStyleAvg+">Z ( "+mJson.WeekNums.ILE+" ) Rekordów</span>");

				$("#t3_n").html(mJson.minMonth.MIN+unit+"<br><span style="+subTsStyleMin+">"+mJson.minMonth.TS+"</span>");
				$("#t3_x").html(mJson.maxMonth.MAX+unit+"<br><span style="+subTsStyleMax+">"+mJson.maxMonth.TS+"</span>");
				$("#t3_g").html(mJson.avgMonth.AVG+unit);
				$("#th3").html("Ostatni miesiąc<br><span style="+subTsStyleAvg+">Z ( "+mJson.MonthNums.ILE+" ) Rekordów</span>");

				var ile = Object.keys(mJson).length;
				}
			};
			xhr.send(sendReq);
}


var toggle = 1;
function zwin()
{
	//console.log("Togg: "+toggle)
	var snav = document.getElementById("sidenav");
	if (toggle){snav.style.marginLeft = -40; toggle=0;
	setTimeout(
	function (){var FX1=document.getElementById("fx1");
	FX1.style.width=400;},450
	);
	}
	else {snav.style.marginLeft = -380; toggle=1; var FX1=document.getElementById("fx1").style.width=0;}

}



function httpChkEspStatus()
{
	var xmlhttp2 = new XMLHttpRequest();
	setInterval(
	function (){		
			//HTTPReq
			xmlhttp2.open("GET", "http://"+ESP_IP+"/espStatus", true);
			xmlhttp2.send();
			xmlhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				KONSOLA.innerHTML = this.responseText;}
			else {KONSOLA.innerHTML = "ESP Jest OFFLINE";}
			};	
		}
	,5000);
}

function httpCheckESPRSSI()
{
	var xmlhttp = new XMLHttpRequest();		
			//HTTPReq
			xmlhttp.open("GET", "http://"+ESP_IP+"/RSSI", true);
			xmlhttp.send();
			xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#rssiholder").html(Math.abs(parseInt(this.responseText,10)))
				//console.log(this.responseText)
				var RSI = Math.abs(parseInt(this.responseText))
				var mappedRSSI = Math.ceil((255-RSI)/10)
				$("#rssiholder").append("<br>"+mappedRSSI+" dB")
				}
			};	
}

setInterval(httpCheckESPRSSI, 800)

function httpGetData(){		
	//HTTPReq
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//console.log("RES:"+this.responseText)
		var mJson = JSON.parse(this.responseText);
		$("#tempholder").html(mJson.Temperature +" &#176;C");
		$("#humholder").html(mJson.Humidity+" %");
		$("#pressholder").html(mJson.Pressure+"<br> hPa");
		$("#dataTakenTimestamp").html("Ostatnia aktualizacja: "+mJson.Timestamp);
		$("#dataTakenTimestamp2").html(window.location.hostname);
		}
	};
	xhr.open("GET", "../smartesp/getCurrentData.php", true);
	xhr.send();
}
setInterval(httpGetData,10000);


function getHist(dataType,inc,hist)
{
	var xmlhttp = new XMLHttpRequest();		
			//HTTPReq
			var req = "sensorType="+dataType+"&Increment="+inc
			xmlhttp.open("POST", "../smartesp/getHistDataFromDB.php", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(req);
			xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				var json = JSON.parse(this.responseText)
				console.log(json)
				var ile = Object.keys(json).length;
				//$("#arr").html("Kluczy: "+ile+"<br>")
				//for (let k=0; k<ile; k++) histVals[k] = json[k][0]
				//$("#arr").append("Min: "+Math.min(...histVals)+"<br>")
				//$("#arr").append("Max: "+Math.max(...histVals))
				for (var i in json)
				{
					histY[i] = json[i][0]
					histX[i] = json[i][1]
					//$("#arr").append("<br>"+json[i][1]+"  :  "+json[i][0])
				}
				//console.log("ARRR: "+hX)
				hist.plot(histY,histX)
				}
			};	
}
const inc = 0.5
//getHist("Temperature",inc)
//setInterval(function(){getHist("Temperature",inc)},10000);

function updateLED(LEDnum)
{
	var LEDid = LEDnum
	var rgbCOL = document.getElementById(LEDid+"_inp").value
	document.getElementById(LEDid+"_bg").style.backgroundColor = rgbCOL;
	var RGBArr = HEXtoRGB(rgbCOL);
	if (RGBArr[0]==0 && RGBArr[1]==0 && RGBArr[2]==0)
	{
		document.getElementById(LEDid+"_val").innerHTML = "Wył."
	}
	else
	{
		//document.getElementById(LEDid+"_val").innerHTML = rgbCOL +
		document.getElementById(LEDid+"_val").innerHTML = RGBArr[0]+" "+RGBArr[1]+" "+RGBArr[2];
	}
	
	var mesage = "Red="+RGBArr[0]+"&Green="+RGBArr[1]+"&Blue="+RGBArr[2];
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://"+ESP_IP+"/get"+LEDid+"?"+mesage, true);

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				KONSOLA.innerHTML = "ESP ODP: "+this.responseText;
				}
			};
			xhr.send(null);
}	

function LEDsOFF(lNum)
{

		document.getElementById(lNum+"_inp").value = "#000000"
		updateLED(lNum)
	
}

function sendSwitch()
{
	var xhr = new XMLHttpRequest();
	var swstate = document.getElementById("chk1").checked;
	$("#chkbox1").html((swstate) ? "<font color='green'>ON</font>" : "<font color='red'>OFF</font>")
	xhr.open("GET", "http://"+ESP_IP+"/getSW1?input1="+swstate, true);

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
				}
			};
			xhr.send(null);
}

function getSendRefFrequency(update)
{
	var xhr = new XMLHttpRequest();
	if (update==="1")
	{
		var RF = $("#refFreq").val()
		xhr.open("GET", "http://"+ESP_IP+"/getSetRefresh?input1="+RF, true);
	}
	else {xhr.open("GET", "http://"+ESP_IP+"/getSetRefresh", true);}

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#refFreqHolder").html(this.responseText+" min.")
				$("#refFreq").val(parseInt(this.responseText,10))
				}
			};
			xhr.send(null);
}




