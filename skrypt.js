//document.getElementById("chk1").addEventListener("change",function()
//{
//	document.getElementById("chkbox1").innerHTML = document.getElementById("chk1").checked +" : "+document.getElementById("chk1").value;
//})

window.addEventListener("load", function() {
onlfoo(); sinefx(); httpGetData(); httpChkEspStatus();
});

var KONSOLA = document.getElementById("konsola");

var ESP_IP = "192.168.1.35";
var IP = document.getElementById("esp_ip");
var IP_LOG = document.getElementById("current_ip");
IP_LOG.innerHTML = "Aktualne IP: "+ESP_IP;

IP.addEventListener("input",function(){
	ESP_IP = $("#esp_ip").val();
	IP_LOG.innerHTML = ESP_IP;
});

var DC = document.getElementById("drawCan");
var DCx = DC.getContext("2d");
DCx.font = "16px Arial";

DC.addEventListener("mousemove", function(e) { 
    var cRect = DC.getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    DCx.clearRect(0, 0, DC.width, 50);  // (0,0) the top left of the canvas
    DCx.fillText("X: "+canvasX+", Y: "+canvasY, 10, 20);
});
DC.addEventListener("mousedown", function(e) { 
	  var rect = DC.getBoundingClientRect(), // abs. size of element
      scaleX = DC.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = DC.height / rect.height;  // relationship bitmap vs. element for Y
    var canvasX = Math.round(e.clientX - rect.left)*scaleX;  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - rect.top)*scaleY;   // from the X/Y positions to make  
 //var img = document.getElementById("gear2");
 //DCx.drawImage(img, canvasX, canvasY);
    //DCx.clearRect(0, 0, DC.width, DC.height);  // (0,0) the top left of the canvas
    //DCx.fillText("X: "+canvasX+", Y: "+canvasY, 10, 20);
	DCx.beginPath();
	DCx.fillStyle = hslToHex(Math.round(Math.random()*360),50,50);
	DCx.fillRect(Math.trunc(canvasX/20)*20,Math.trunc(canvasY/20)*20,20,20);
	DCx.closePath();
	DCx.stroke();

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

	

function updRangeRGB()
{
	var RangeCol = document.getElementById("sd3");
	var rgbCOL = RangeCol.value;
	document.getElementById("LEDbg1").style.backgroundColor = rgbCOL;
	RGBArr = HEXtoRGB(rgbCOL);
	document.getElementById("val2").innerHTML = rgbCOL +
	" <br><font color='red'> R: "+RGBArr[0] + "<font color='green'> G: "+RGBArr[1]+"<font color='blue'> B: "+RGBArr[2]+"</font>";
	
	var mesage = "Red="+RGBArr[0]+"&Green="+RGBArr[1]+"&Blue="+RGBArr[2];
	
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://"+ESP_IP+"/getRGB?"+mesage, true);

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//var mJson = JSON.parse(this.responseText);
				KONSOLA.innerHTML = "Wysłałem kolor do ESP!";
				}
				else KONSOLA.innerHTML = "NIE UDALO SIE WYSLAC KOLORU!";
			};
			xhr.send(null);
	
}	
// losowy kolor "#"+Math.floor(Math.random()*16777215).toString(16);
function updRangeRGB2()
{
	var RangeCol = document.getElementById("sd4");
	var rgbCOL = RangeCol.value;
	document.getElementById("LEDbg2").style.backgroundColor = rgbCOL;
	RGBArr = HEXtoRGB(rgbCOL);
	document.getElementById("val3").innerHTML = rgbCOL +
	" <br><font color='red'> R: "+RGBArr[0] + "<font color='green'> G: "+RGBArr[1]+"<font color='blue'> B: "+RGBArr[2]+"</font>";
	
	var mesage = "Red="+RGBArr[0]+"&Green="+RGBArr[1]+"&Blue="+RGBArr[2];
	
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://"+ESP_IP+"/getRGB2?"+mesage, true);

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//var mJson = JSON.parse(this.responseText);
				KONSOLA.innerHTML = "Wysłałem kolor do ESP!";
				}
				else KONSOLA.innerHTML = "NIE UDALO SIE WYSLAC KOLORU!";
			};
			xhr.send(null);
	
}	


function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

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

		this.ctx.beginPath();
		this.ctx.moveTo((this.W/2)+CX*this.W,(this.H/2)+SX*this.H);
		//this.ctx.lineTo(Math.round(Math.random()*this.W),0);
		var exp1 = (2*Math.tan(1/8*katRad));
		var exp2 = (20*Math.cos(1/4*katRad));
		this.ctx.lineTo(exp1+exp2+(this.W/2+CX*dlg),(30*Math.sin(4*(this.iter)*katRad))+this.H/2+0.5*SX*dlg);
		this.ctx.strokeStyle = hslToHex(this.iter/10,100,50);
		this.ctx.lineWidth = 3;
		this.ctx.stroke();
	}
}

var dial1 = new dial("dialCan");
setInterval
(
	function()
	{
		for (var i=0; i<10; i++) dial1.draw();	
	}
,10);




function updRange()
{
	var Range = document.getElementById("sd1");
	var ROut = document.getElementById("RangeVal");
	ROut.innerHTML = Range.value;
}

function chcol()
{
var c1 = document.getElementById("bc1").value;
var c2 = document.getElementById("bc2").value;
document.body.style.backgroundImage='linear-gradient(to bottom right,'+c1+','+c2+')';
}

var toggle = 1;
function zwin()
{
	var snav = document.getElementById("sidenav");
	if (toggle){snav.style.marginLeft = -40; toggle=0;
	setTimeout(
	function (){var FX1=document.getElementById("fx1");
	FX1.style.width=400;},450
	);
	}
	else {snav.style.marginLeft = -380; toggle=1; var FX1=document.getElementById("fx1").style.width=0;}

}

function onlfoo()
{
	var BAR = document.getElementById("bar");
	var HIMG = document.getElementById("h_bg");
	setInterval(
	function (){
		BAR.style.width=Math.round(Math.random()*400);
		var hoffset = 120+Math.round(Math.random()*50);
		BAR.style.backgroundColor="hsl("+hoffset+",100%,50%)";
		HIMG.style.filter="hue-rotate("+hoffset+"deg)"
		
		}
	,500);
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
	,2500);
}


function sendSwitch()
{
	var TEMP = document.getElementById("chk1");
	var xhr = new XMLHttpRequest();
	document.getElementById("chkbox1").innerHTML = document.getElementById("chk1").checked +" : "+document.getElementById("chk1").value;
	var swstate = document.getElementById("chk1").checked;
	xhr.open("GET", "http://"+ESP_IP+"/get?inp2=13&input1="+swstate, true);
	//http.setRequestHeader('input1', '1313');

			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//var mJson = JSON.parse(this.responseText);
				//TEMP.innerHTML=mJson.data.temp +" *C </br>"+
				//mJson.data.hum+" %</br>"+
				//mJson.data.press+" hPa";
				//daj = mJson.data.hum;
				//alert(this.responseText);
				}
			};
			xhr.send(null);
}

function httpGetData()
{
	var TEMP_VAL = document.getElementById("tempholder");
	var HUM_VAL = document.getElementById("humholder");
	var PRESS_VAL = document.getElementById("pressholder");
	var xhr = new XMLHttpRequest();
	setInterval(
	function (){		
			//HTTPReq
			xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var mJson = JSON.parse(this.responseText);
				TEMP_VAL.innerHTML=mJson.data.temp +" *C";
				HUM_VAL.innerHTML = mJson.data.hum+" %";
				PRESS_VAL.innerHTML = mJson.data.press+"<br> hPa";
				}
			};
			xhr.open("GET", "../smartesp/callback.php", true);
			xhr.send();		
		}
	,1000);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sinefx()
{
	
	var curr=0;
	var fri = document.getElementById("fringle1");
	var fri2 = document.getElementById("fringle2");
	var v2;
	var v3;
	setInterval(
	function (){
			curr+=0.01;
			v2 = Math.abs(Math.sin(curr)*1740);
			fri.style.width = v2;
			v3 = Math.abs(Math.cos(0.5*curr)*1740);
			fri2.style.width = v3;
		}
	,50);
}



var iii = 0;
function dodaj()
{
	iii++;
	var ele = document.createElement("DIV");
	ele.innerHTML = "<p> nowy </p> <div>"+iii+"</div>";
	ele.classList.add("elem");
	document.getElementById("content").appendChild(ele);	
}

//////////////////////////-----------------------------------


