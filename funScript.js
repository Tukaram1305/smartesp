
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
onlfoo();

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

var ELEMS = 40
var test = new Array(ELEMS).fill(0);
var testY = new Array(ELEMS).fill(0);
//for (let i=0; i<20; i++) test[i] = Math.round(Math.random()*40-20);
var co = 1;
if (co==1 || co==0) for (let i=0; i<ELEMS; i++) test[i] = Math.pow(i,1.6);
if (co==2) for (let i=0; i<ELEMS; i++) test[i] = 20+Math.random();
if (co==3) for (let i=0; i<ELEMS; i++) test[i] = -30-Math.round(Math.random()*5);


for (let i=0; i<ELEMS; i++) testY[i] = i;
var bigChart = new markCharts("bigCan");
//bigChart.setBG("#212121","#111122","#221111")
bigChart.plot(test,testY);

function cath(){bigChart.plot(test,testY);bigChart2.plot(dataY,dataX);}

// z requestem ------------ RYSOWANIE
if (co===0){
var fps = 50;
var CHFPS = Math.round(1000/fps);
var rr = 0.0;
var iter =0;
var MAGNITUDE = 1.0;

function drawChart_1(){
	
	setTimeout(function(){
		iter++;
		///console.log(...test)
		if (iter%100==0) {MAGNITUDE = Math.random()*0.1; }
		test[ELEMS-1] = (Math.round(MAGNITUDE*7.3*Math.sin(rr*0.07556)))*(Math.round(MAGNITUDE*100*Math.sin(4*rr)))+(Math.round(MAGNITUDE*500*Math.sin(0.05*rr)))+(Math.round(25*Math.sin(2*rr))+(Math.round(MAGNITUDE*700*Math.sin(2.33333*rr)))+(Math.round(MAGNITUDE*442*Math.sin(7.5*rr))));
		//test[50] = (globTemp==undefined) ? 0 : globTemp
		this.rq++;

		var dzisiaj = new Date();
		var date = dzisiaj.getDate()+'/'+(dzisiaj.getMonth()+1)+'/'+dzisiaj.getFullYear();
		var time = dzisiaj.getHours() + ":" + dzisiaj.getMinutes() + ":" + dzisiaj.getSeconds();
		var fullDate = date+" - "+time;

		//testY[ELEMS-1] = rr.toFixed(2);
		testY[ELEMS-1] = fullDate
		rr+=0.025;
		//rr+=1;
		if (rr>=2*Math.PI) rr=0;
		for (let i=1; i<ELEMS; i++) {test[i-1]=test[i]; testY[i-1]=testY[i];}
		bigChart.plot(test,testY);

		requestAnimationFrame(drawChart_1);
	},CHFPS);

}}
// wywolaj po raz pierszy
reportWindowSize()
if (co===0) requestAnimationFrame(drawChart_1);
// z requestem ------------ RYSOWANIE END
//////////////////////////-----------------------------------


