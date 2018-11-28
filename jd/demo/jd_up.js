const rand = function (min, max) {
    return Math.random() * (max - min) + min
}
const randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const normalRand = function (mu, sigma) {
    //mu = mean
    //sigma = standard deviation 
    //normal distribution between -6 and 6
    //This is not accurate, but that doesn't matter
    let sum = 0
    for (let i = 0; i < 6; i += 1) {
        sum += rand(-1, 1)
    }
    let normal = sum / 6
    return mu + sigma * normal
}

const normalPDF = function (x, mu, sigma) {
    //See also https://en.wikipedia.org/wiki/Normal_distribution
    //mu = mean
    //sigma = standard devition
    //sigma^2 = letiance.
    let sigma2 = sigma ** 2
    let p_1 = 1 / ((2 * Math.PI * sigma2) ** 0.5)
    let p_2 = Math.exp(-((x - mu) ** 2) / (2 * sigma2))
    return p_1 * p_2
}

const set_canvas_style = function (c) {
    //Set style for the canvas 'c'
    c.style.margin = "0 auto"
    c.style.display = "block"
    c.style.backgroundColor = 'black'
    c.style.marginBottom = '0'
}
const set_body_style = function () {
    body = document.getElementsByTagName('body')[0]
    body.style.backgroundColor = 'black'
}

const set_canvas_size = function (c) {
    minSide = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth; //Get smallest size.

    c.style.height = window.innerHeight
    c.style.width = minSide

    c.height = window.innerHeight
    c.width = minSide
}
const set_contex = function (c) {
    let ctx = c.getContext('2d')
    ctx.lineWidth = 1.2
    ctx.strokeStyle = 'white'
    return ctx
}

let smoothness = 25; //Higher = smoother animation
let fps = 30

let canvas = document.createElement("canvas")

set_canvas_style(canvas)
set_body_style()

set_canvas_size(canvas)
document.body.appendChild(canvas);//Add canvas to the DOM
ctx = set_contex(canvas)//Setup for drawing of image


//100 px margin in each direction
let xMin = minSide / 5
let xMax = minSide - xMin
let xMid = (xMin + xMax) / 2
let yMin = window.innerHeight / 12
let yMax = window.innerHeight - yMin

//n of lines and points
let nLines = 80
let nPoints = 80



//Delta's for points and line
let dx = (xMax - xMin) / nPoints
let dy = (yMax - yMin) / nLines

//Make array to store data of points
let data = []
for (i = 0; i < nLines; i++) {
    data.push(createLine())
}


function createLine() {
    x = xMin
    let line = []

    let nModes = randInt(1, 4) //Number of "peaks" in a line

    let mus = []
    let sigmas = []
    for (let j = 0; j < nModes; j++) {
        mus[j] = normalRand(xMid, 100)
        sigmas[j] = normalRand(24, 30)
    }

    for (let j = 0; j < nPoints; j++) {
        x = x + dx
        y = 0
        for (let l = 0; l < nModes; l++) {
            y += normalPDF(x, mus[l], sigmas[l])
        }
        y = (y * 1000) + (2 * Math.random())
        line.push([x, y])
    }
    return line
}

function shift() {
    data.shift()
    data.push(createLine())
}

function drawImage() {
    //Shift the array every "smoothness" frames, and reset framecounter
    frames = (frames + 1) % smoothness
    if (frames == 0) {
        shift()
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#A0A0A0'; //Set draw color to gray 

    for (let i = 0; i < nLines; i++) {
        //Start drwaing the path
        ctx.beginPath()
        for (let j = 0; j < nPoints; j++) {
            //First and last line don't move, while everything inbetween does.
            if (i == nLines - 1) {
                y = -data[i][j][1] + dy * i + yMin - dy
            } else if (i == 0) {
                y = -data[i][j][1] + dy * i + yMin
            } else {
                y = -data[i][j][1] + dy * i + yMin - (frames / smoothness * dy)
            }
            //Load data from array and draw line
            ctx.lineTo(data[i][j][0], y)
        }
        //Finish drwaing the path
        ctx.fill()
        ctx.stroke()
    }
}

let frames = 0
let interval = setInterval(drawImage, 1000 / fps)
window.addEventListener('resize', function () {
    this.clearInterval(interval)
    set_canvas_size(canvas)
    interval = setInterval(drawImage, 1000 / fps)
})