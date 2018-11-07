//Constants
const GRADIENT_LENGTH = 10
const FONT_SIZE = 30

//Krijg canvas en zet context
let canvas = document.getElementById('cnvs')
let ctx = canvas.getContext('2d')


const algorithm = function (z, its, z_max) {
    let i = its
    while (z.length() <= z_max && i >= 0) {
        z = z.func(CONSTANT)
        i = i - 1
    }
    return i
}

class Complex {
    constructor(real, imag) {
        this.imag = imag
        this.real = real
    }
    func(a) {
        return new Complex(this.real ** 2 - this.imag ** 2 + a.real, this.imag * this.real * 2 + a.imag)
    }
    length() {
        return Math.sqrt(this.imag * this.imag + this.real * this.real)
    }

}

class Image {
    constructor(s, x, y) {
        this.zoom = s
        this.x_offset = x
        this.y_offset = y
        this.update_values()

    }
    update_values() {
        this.y_max = canvas.height + this.y_offset
        this.x_max = canvas.width + this.x_offset
        this.max = 1.5 / this.zoom
    }

    generate_array() {
        this.array = []
        this.intensity = []

        for (let i = this.x_offset; i < this.x_max; i++) {
            this.array[i] = []
            this.intensity[i] = []

            let Re = ((canvas.width / 2) - i) / (canvas.width / 2) * this.max
            for (let j = this.y_offset; j < this.y_max; j++) {
                let im = (((this.y_max / 2) - j) / (canvas.width / 2)) * this.max
                this.array[i][j] = new Complex(Re, im)
            }
        }
    }
    calculate() {
        for (let i = this.x_offset; i < this.x_max; i++) {
            for (let j = this.y_offset; j < this.y_max; j++) {
                const r = algorithm(this.array[i][j], ITERATIONS, 2)
                this.intensity[i][j] = gradient[Math.floor(r % 50)]
            }
        }
    }
    draw() {
        for (let i = this.x_offset; i < this.x_max; i++) {
            for (let j = this.y_offset; j < this.y_max; j++) {
                ctx.fillStyle = this.intensity[i][j]
                ctx.fillRect(i - this.x_offset, j - this.y_offset, 1, 1)
            }
        }
    }


}
const set_canvas_cursur = function (n) {
    canvas.style.cursor = n
    return 1
}
const main = function () {
    let t0 = performance.now();
    im.update_values()
    im.generate_array()
    im.calculate()
    let t1 = performance.now();
    console.log("Call to all the code but draw took " + (t1 - t0) + " milliseconds.")
    im.draw()
    let t2 = performance.now();
    console.log("Call to draw took " + (t2 - t1) + " milliseconds.")
}

const CONSTANT = new Complex(-0.7, -0.4)
const ITERATIONS = 250
let zoom = 1
im = new Image(1, 0, 0);

document.addEventListener("wheel", async function (event) {
    let delta = Math.sign(event.deltaY)
    im.zoom = im.zoom - (im.zoom * 0.5 * delta)
    setTimeout(main(), 100)
})
document.addEventListener("keydown", function (event) {
    let key = event.keyCode
    if (key == 37) {
        im.x_offset = im.x_offset - (0.25 * canvas.width)
        main()
    }
    else if (key == 38) {
        im.y_offset = im.y_offset - (0.25 * canvas.height)
        main()
    }
    else if (key == 39) {
        im.x_offset = im.x_offset + (0.25 * canvas.width)
        main()
    }
    else if (key == 40) {
        im.y_offset = im.y_offset + (0.25 * canvas.height)
        main()
    }

})



let gradient = ["#FF0000", "#EB0013", "#D80027", "#C5003A", "#B1004E", "#9E0062", "#8B0075", "#770089", "#64009C", "#5100B0", "#3D00C4", "#2A00D7", "#1700EB", "#0400FF", "#1814E9", "#2D29D4", "#423DBF", "#5752AA", "#6C6694", "#817B7F", "#96906A", "#ABA455", "#C0B93F", "#D5CD2A", "#EAE215", "#FFF700", "#F3E215", "#E7CD2A", "#DCB93F", "#D0A455", "#C4906A", "#B97B7F", "#AD6694", "#A152AA", "#963DBF", "#8A29D4", "#7E14E9", "#7300FF", "#7E00E9", "#8A00D4", "#9600BF", "#A100AA", "#AD0094", "#B9007F", "#C4006A", "#D00055", "#DC003F", "#E7002A", "#F30015", "#FF0000"]

main(1, 0, 0)