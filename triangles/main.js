
const rand_int = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min)
}

const relative_distance = function (a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2
}

const get_random_point = function () {
    return [rand_int(0, WIDTH), rand_int(0, HEIGHT)]
}

const draw_point = function (c) {
    ctx.fillRect(c[0], c[1], DOT_SIZE, DOT_SIZE)
}

const draw_line = function (a, b) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
}
const draw_random_spread = function () {
    let points = []
    for (let x = 1; x < x_dots; x++) {
        for (let y = 1; y < y_dots; y++) {
            coords = [x * SPREAD + rand_int(-0.5 * SPREAD, 0.5 * SPREAD), y * SPREAD + rand_int(-0.5 * SPREAD, 0, 5 * SPREAD)]
            ctx.fillStyle = "#FFFFFF";
            draw_point(coords)
            points.push(coords)

        }
    }
    return points
}
const algorithm = function (p) {

    points = draw_random_spread()
    points.sort(function (a, b) { return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 })
    console.log(points)
    ctx.fillStyle = "#FF0000";
    p = get_random_point()
    draw_line(p, points[0])
    draw_point(get_random_point())


}

const SPREAD = 100
const WIDTH = 500
const HEIGHT = 800
const DOT_SIZE = 3

let canvas = document.getElementById("main_canvas")
let ctx = canvas.getContext('2d')

canvas.height = HEIGHT
canvas.width = WIDTH
canvas.style.backgroundColor = 'black'

let x_dots = WIDTH / SPREAD
let y_dots = HEIGHT / SPREAD



algorithm()
