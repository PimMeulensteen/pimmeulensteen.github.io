const GRADIENT_LENGTH = 10
const FONT_SIZE = 30
let c = document.getElementById('cnvs')
let ctx = c.getContext('2d')

const set_canvas_size = function () {
    if (window.location.href.split("/").slice(-2)[0] == "demo") {
        c.width = window.innerWidth
        c.height = window.innerHeight
    }
    x_l = Math.ceil(c.width / FONT_SIZE)
    y_l = Math.ceil(c.height / FONT_SIZE) + 2

    ctx.font = FONT_SIZE + "px monospace";
}

const clear_canvas = function () {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, c.width, c.height)
}

const write_text = function (text, x, index) {
    if (index > 0) {
        let green_level = 0
        string = text.split("")
        ctx.fillStyle = "white"
        for (n = 0; n < index - 1; n++) {
            if (index - GRADIENT_LENGTH < n) {
                green_level += 255 / (GRADIENT_LENGTH - 1);
            } else {
                green_level = 0
            }
            ctx.fillStyle = "rgb(0," + green_level + ",0)"
            ctx.fillText(string[n], x, FONT_SIZE * n);
        }
        ctx.fillStyle = "white"
        ctx.fillText(string[index], x, FONT_SIZE * n);
    }
}

const rand_str = function (len) {

    let s = '';
    while (len--) s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
    return s;
}

const init_index_array = function () {
    let indexes = new Array(x_l)
    for (i = 0; i < x_l; i++) {
        indexes[i] = 0
    }
    return indexes
}

const init_random_array = function () {
    let randoms = new Array(x_l)
    for (i = 0; i < x_l; i++) {
        randoms[i] = rand_str(y_l)
    }
    return randoms
}

set_canvas_size()
let indexes = init_index_array()
let randoms = init_random_array()



setInterval(function () {
    clear_canvas()
    random_numner = Math.floor(Math.random() * x_l)
    if (indexes[random_numner] == 0) {
        indexes[random_numner] = 1
    }
    for (z = 0; z < x_l; z++) {
        if (indexes[z] > 0) {
            indexes[z]++;
        }

        write_text(randoms[z], z * 30, indexes[z])
        if (indexes[z] > y_l + GRADIENT_LENGTH) {
            indexes[z] = 0
            randoms[z] = rand_str(y_l)
        }
    }
}, 150)

window.addEventListener("resize", function () {
    clear_canvas()
    set_canvas_size()
    indexes = init_index_array()
    randoms = init_random_array()
})