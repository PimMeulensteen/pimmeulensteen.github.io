//Setup canvas in DOM
var helperDiv = document.createElement("div");
helperDiv.style.textAlign = "center";
var canvas = document.createElement("canvas");
var minSide = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth; //Get smallest size.
helperDiv.style.backgroundColor = 'black';

//Set style for the canvas
canvas.style.height = window.innerHeight;
canvas.style.width = minSide;
canvas.style.margin = "0 auto";
canvas.style.backgroundColor = 'black';
canvas.style.marginBottom = '0';
canvas.height = window.innerHeight;
canvas.width = minSide;

//Add elements to the DOM
helperDiv.appendChild(canvas);
document.body.appendChild(helperDiv);


var smoothness = 50; //Higher = smoother animation
var fps = 60;


//Setup for drawing of image
var ctx = canvas.getContext('2d');
ctx.lineWidth = 1.2;
ctx.strokeStyle = 'white';

//100 px margin in each direction
var xMin = minSide / 4;
var xMax = minSide - xMin;
var xMid = (xMin + xMax) / 2;
var yMin = window.innerHeight/ 8;
var yMax = window.innerHeight - yMin;

//n of lines and points
var nLines = 80;
var nPoints = 100;



//Delta's for points and line
var dx = (xMax - xMin) / nPoints;
var dy = (yMax - yMin) / nLines;

//Make array to store data of points
var data = []
for (i = 0; i < nLines; i++) {
    data.push(createLine())
}

function rand(min, max) {
    return Math.random() * (max - min) + min
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
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

function createLine() {
    x = xMin;
    var line = []

    var nModes = randInt(1, 4) //Number of "peaks" in a line

    var mus = []
    var sigmas = []
    for (var j = 0; j < nModes; j++) {
        mus[j] = normalRand(xMid, 100)
        sigmas[j] = normalRand(24, 30)
    }

    for (var j = 0; j < nPoints; j++) {
        x = x + dx;
        y = 0
        for (var l = 0; l < nModes; l++) {
            y += normalPDF(x, mus[l], sigmas[l])
        }
        y = (y * 1000) + (2 * Math.random())
        line.push([x, y])
    }
    return line;
}
function shift() {
    data.shift()
    data.push(createLine())
}

function drawImage() {
    //Shift the array every "smoothness" frames, and reset framecounter
    frames = (frames + 1) % smoothness;
    if (frames == 0) {
        shift();
    }
    //Make canvas black to redraw
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#A0A0A0'; //Set draw color to gray 

    for (var i = 0; i < nLines; i++) {
        ctx.beginPath()
        for (var j = 0; j < nPoints; j++) {
            //First and last line don't move, while everything inbetween does.
            if (i == nLines - 1) {
                y = -data[i][j][1] + dy * i + yMin - dy;
            } else if (i == 0) {
                y = -data[i][j][1] + dy * i + yMin;
            } else {
                y = -data[i][j][1] + dy * i + yMin - (frames / smoothness * dy)
            }
            //Load data from array and draw line
            ctx.lineTo(data[i][j][0], y);
        }
        ctx.fill()
        ctx.stroke();
    }
}

var frames = 0;
setInterval(drawImage, 1000 / fps)