//Constants
const GRADIENT_LENGTH = 10
const FONT_SIZE = 30

//Krijg canvas en zet context
let canvas = document.getElementById('cnvs')
let ctx = canvas.getContext('2d')

const set_canvas_size = function () {
    //Als de index.html in een map 'demo' zit,
    //Dan maakt de canvas zo groot mogelijk
    if (window.location.href.split("/").slice(-2)[0] == "demo") {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    //definier hoeveel karakters er op het scherm passen.
    n_char_in_x = Math.floor(canvas.width / FONT_SIZE)
    n_char_in_y = Math.ceil(canvas.height / FONT_SIZE) + 2
    ctx.font = FONT_SIZE + "px monospace";
}

const clear_canvas = function () {
    //Maak de gehele canvas zwart
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const write_text = function (text, x, index) {
    let green_level = 0
    for (n = index - GRADIENT_LENGTH; n < index - 1; n++) {
        //Maak een gradient van groen naar zwart
        green_level += 255 / (GRADIENT_LENGTH);
        //Zet dit als text kleur en teken het karakter
        ctx.fillStyle = "rgb(0," + green_level + ",0)"
        ctx.fillText(text[n], x * FONT_SIZE, n * FONT_SIZE);
    }
    //Kleur het karakter met index 'index' wit
    ctx.fillStyle = "white"
    ctx.fillText(text[index], x * FONT_SIZE, n * FONT_SIZE);
}

const random_arary = function (len) {
    //Return een array van lengte 'len' met random karakters
    let s = [];
    while (len--) s.push(String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33)))
    return s;
}

const init_index_array = function (len) {
    //Return een array gevuld met nullen met lengte 'len'
    let indexes = new Array(len)
    for (i = 0; i < len; i++) {
        indexes[i] = 0
    }
    return indexes
}

const init_random_array = function (len, random_array_length) {
    //Maak een array gevuld met nullen met lengte 'len'
    //en vul deze array met "random_array_length" random karkaters
    let randoms = new Array(len)
    for (i = 0; i < len; i++) {
        randoms[i] = random_arary(random_array_length)
    }
    return randoms
}
//Reset als de windowsize veranderd
window.addEventListener("resize", function () {
    set_canvas_size()
    indexes = init_index_array(n_char_in_x)
    randoms = init_random_array(n_char_in_x, n_char_in_y)

})

//INIT
set_canvas_size()
let indexes = init_index_array(n_char_in_x)
let randoms = init_random_array(n_char_in_x, n_char_in_y)

//LOOP
setInterval(function () { //Elke 150ms doe:

    clear_canvas() //Maak de canvas geheel zwart
    random_numner = Math.floor(Math.random() * n_char_in_x) //Kies een random kollomen

    //Als deze kollomen nog niet is gestard (dus 0 is), start deze door deze op een te zetten
    if (indexes[random_numner] == 0) {
        indexes[random_numner] = 1
    }

    //Loop over alle kolomen
    for (z = 0; z < n_char_in_x; z++) {
        //Als de positie van het witte blokje niet nul is
        if (indexes[z] > 0) {

            write_text(randoms[z], z, indexes[z]) //teken de kolom
            indexes[z]++; //Verhoog positie van het witte blokje met een 
        }

        if (indexes[z] > n_char_in_y + GRADIENT_LENGTH) {
            //ALS de "drop" geheel uit het beeld is
            //DAN wordt deze gereset
            indexes[z] = 0
            randoms[z] = random_arary(n_char_in_y)
        }
    }
}, 125)

