/* @copyright Dmitriy Karaush dkaraush.shpp.me */

var canvas = document.getElementById("bg");
var ctx = canvas.getContext("2d");

const gridSize = 120;
const offsetMax = 35;
const borderSize = 75;

var W = 0, H = 0,
	gridW = 0, gridH = 0,
	points = [];

function onResize() {
	var lastW = W, lastH = H;
	W = window.innerWidth;
	H = window.innerHeight;

	canvas.width = W;
	canvas.height = H;

	var newGridW = ~~((W + borderSize * 2) / gridSize) + 2;
	var newGridH = ~~((H + borderSize * 2) / gridSize) + 2;

	if (newGridH > gridH) {
		for (var i = gridH; i < newGridH; ++i) {
			for (var j = 0; j < gridW; ++j) {
				if (typeof points[i] === "undefined")
					points[i] = [];
				points[i].push(newPoint(j, i));
			}
		}
	} else if (newGridH < gridH) {
		points.splice(newGridH, gridH-newGridH);
	}

	gridH = newGridH;
	if (newGridW > gridW) {
		for (var i = 0; i < gridH; ++i) {
			for (var j = gridW; j < newGridW; ++j) {
				if (typeof points[i] === "undefined")
					points[i] = [];
				points[i].push(newPoint(j, i));
			}
		}
	} else if (newGridW < gridW) {
		for (var i = 0; i < gridH; ++i)
			points[i].splice(newGridW, gridW-newGridW);
	}
	gridW = newGridW;
}
window.addEventListener("resize", onResize);
onResize();

function render() {
	ctx.clearRect(0, 0, W, H);

	var trianglesCount = (gridW - 1) * (gridH - 1) * 2;
	for (var i = 0; i < trianglesCount; ++i) {
		var j = ~~(i/2);
		var point1 = [j - ~~(j/(gridW-1))*(gridW-1), ~~(j/(gridW-1))];
		var point2 = [point1[0]+(i%2==0?0:1), point1[1]+(i%2==0?1:0)];
		var point3 = [point1[0]+1, point1[1]+1];
		point1=getAPoint(point1);
		point2=getAPoint(point2);
		point3=getAPoint(point3);
		if (point1 == null || point2 == null || point3 == null) {
			requestAnimationFrame(render);
			return;
		}
		ctx.beginPath();
		ctx.moveTo(point1[0], point1[1]);
		ctx.lineTo(point2[0], point2[1]);
		ctx.lineTo(point3[0], point3[1]);
		ctx.lineTo(point1[0], point1[1]);
		ctx.fillStyle = "rgba(255,255,255,"+(point1[2]+point2[2]+point3[2])/12+")";
		ctx.fill();
		ctx.closePath();
	}

	for (var y = 0; y < gridH; ++y) {
		for (var x = 0; x < gridW; ++x) {
			points[y][x][2] += points[y][x][3];
			if (points[y][x][2]<0||points[y][x][2]>0.55) {
				points[y][x][3] = -points[y][x][3];
				points[y][x][2] += points[y][x][3];
			}

			points[y][x][0] += points[y][x][4];
			if (points[y][x][0]<x*gridSize-offsetMax||
				points[y][x][0]>x*gridSize+offsetMax) {
				points[y][x][4] = -points[y][x][4];
			}

			points[y][x][1] += points[y][x][5];
			if (points[y][x][1]<y*gridSize-offsetMax||
				points[y][x][1]>y*gridSize+offsetMax) {
				points[y][x][5] = -points[y][x][5];
			}
		}
	}

	requestAnimationFrame(render);
}
render();

function getAPoint(a) {return points[a[1]][a[0]];}
function getPoint(x, y) {return points[y][x];}
function newPoint(x, y) {
	return [x * gridSize + (Math.random()*(offsetMax*2)-offsetMax) - borderSize, 
			y * gridSize + (Math.random()*(offsetMax*2)-offsetMax) - borderSize,
			(Math.random()*0.05+0.1), Math.random()*0.015, 
			((Math.random()*0.25+0.75)*2-1)*offsetMax*0.0025, 
			((Math.random()*0.25+0.75)*2-1)*offsetMax*0.0025];
}