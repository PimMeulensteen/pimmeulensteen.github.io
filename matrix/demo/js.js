const GRADIENT_LENGTH = 10

let c = document.getElementById('cnvs')
let ctx = c.getContext('2d')

const set_canvas_size = function () {
    c.height = window.innerHeight
    c.width = window.innerWidth
    x_l = Math.floor(window.innerWidth / 30)
    y_l = Math.ceil(window.innerHeight / 30) + 1
}

const clear_canvas = function () {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, c.width, c.height)
}

const write_text = function (text, x, index) {
    if (index > 0) {
        let green_level = 0
        string = text.split("")

        ctx.font = "30px monospace";
        ctx.fillStyle = "white"

        for (n = 0; n < index; n++) {
            if (index - GRADIENT_LENGTH < n) {
                green_level += 255 / (GRADIENT_LENGTH - 1);
            } else {
                green_level = 0
            }
            ctx.fillStyle = "rgb(0," + green_level + ",0)"
            ctx.fillText(string[n], x, 30 * (n));
        }
        ctx.fillStyle = "white"
        ctx.fillText(string[index], x, 30 * (n));
    }

}

const randStr = function (len) {
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
        randoms[i] = randStr(y_l)
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
            randoms[z] = randStr(y_l)
        }
    }
}, 100)

window.addEventListener("resize", function () {
    clear_canvas()
    set_canvas_size()
    indexes = init_index_array()
    randoms = init_random_array()

})