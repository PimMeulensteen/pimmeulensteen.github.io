let c = document.getElementById('cnvs')
let ctx = c.getContext('2d')

c.height = window.innerHeight;
c.width = window.innerWidth;;

const clear_canvas = function () {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, c.width, c.height)
}
let GRADIENT_LENGTH = 10
const write_text = function (text, x, index) {

    let g = 0
    ctx.font = "30px monospace";

    string = text.split("")
    ctx.fillStyle = "white"
    for (n = 0; n < index; n++) {
        if (index - GRADIENT_LENGTH < n) {
            g += 255 / (GRADIENT_LENGTH-1);
        } else {
            g = 0
        }   
        ctx.fillStyle = "rgb(0," + g + ",0)"
        ctx.fillText(string[n], x, 30 * (n));
    }
    ctx.fillStyle = "white"
    ctx.fillText(string[index], x, 30 * (n));
}

const randStr = function (len) {
    let s = '';
    while (len--) s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
    return s;
}

x_l = Math.ceil(window.innerWidth / 30)
y_l = Math.ceil(window.innerHeight / 30)

let randoms = new Array(x_l)
let indexes = new Array(x_l)

for (i = 0; i < x_l; i++) {
    randoms[i] = randStr(y_l)
    indexes[i] = 0
}

setInterval(function () {
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


