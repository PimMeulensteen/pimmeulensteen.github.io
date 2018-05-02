//Setup canvas in DOM
var helper_div = document.createElement("div");
helper_div.style.textAlign = "center";
var canvas = document.createElement("canvas");
var min_side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
helper_div.style.backgroundColor = 'black';

canvas.style.height = min_side;
canvas.style.width = min_side;
canvas.style.margin = "0 auto";
canvas.style.backgroundColor = 'black';
canvas.height = min_side;
canvas.width = min_side;

helper_div.appendChild(canvas);
document.body.appendChild(helper_div);

//Setup for drawing of image
var ctx = canvas.getContext('2d');
ctx.lineWidth = 1.2;
ctx.strokeStyle = 'white';

//100 px margin in each direction
var xMin = min_side / 4;
var xMax = min_side - xMin;
var xMid = (xMin + xMax) / 2;
var yMin = min_side / 8;
var yMax = min_side - yMin;

//n of lines and points
var nLines = 80;
var nPoints = 100;

//Make array to store data of points
var data = []
for(i = 0; i < nLines; i++){
    sub_data = []
    for(j = 0; j < nLines; j++){
        sub_data.push(0)
    }
    data.push(sub_data)
}

//Delta's for points and line
var dx = (xMax - xMin) / nPoints;
var dy = (yMax - yMin) / nLines;
function rand (min, max) {
    return Math.random() * (max - min) + min
  }
  
function normalRand(mu, sigma) {
    //mu = mean
    //sigma = standard deviation

    //normal distribution between -6 and 6;
    //Note: This is not accurate, but that doesn't matter; noise is welcome!
    var sum = 0
    for (var i = 0; i < 6; i += 1) {
        sum += rand(-1, 1)
    }
    var normal = sum / 6
    return mu + sigma * normal
}

function normalPDF(x, mu, sigma) {
    //See also https://en.wikipedia.org/wiki/Normal_distribution
    //mu = mean
    //sigma = standard devition
    //sigma^2 = variance.
    var sigma2 = sigma ** 2;
    var p_1 = 1 / ((2 * Math.PI * sigma2) ** 0.5);
    var p_2 = Math.exp(-((x - mu) ** 2) / (2 * sigma2));
    return p_1 * p_2;
}

function draw_image() {
    //Start values of x and y
    var x = xMin;
    var y = yMin;

    ctx.moveTo(x, y);

    for (var i = 0; i < nLines; i++) {
        ctx.beginPath()
        var mu = normalRand(xMid, 70)
        var sigma = normalRand(50, 50)
        for (var j = 0; j < nPoints; j++) {
            x = x + dx;
            point_y = y - (normalPDF(x, mu, sigma)*5000)
            point_x = x
            ctx.lineTo(point_x, point_y);
            data[i][j] = [point_x, point_y]
        }

        ctx.fill()
        ctx.stroke();

        x = xMin;
        y = y + dy;
        ctx.moveTo(x, y);
    }



}

draw_image();
console.log(data)