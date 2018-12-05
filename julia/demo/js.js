//Constants
const GRADIENT_LENGTH = 10
const FONT_SIZE = 30

//Krijg canvas en zet context
let canvas = document.getElementById('cnvs')
let ctx = canvas.getContext('2d')


const algorithm = function (z, its, z_max) {
    z_max = z_max ** 2
    while (z[0] * z[0] + z[1] * z[1] <= z_max && its >= 0) {
        z = [z[0] ** 2 - z[1] ** 2 + CONSTANT[0], z[1] * z[0] * 2 + CONSTANT[1]]
        its = its - 1
    }
    return its
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
        this.zoom_factor = 1 / this.zoom
        this.intensity = []
    }

    generate_array() {
        this.array = []
        this.intensity = []

        for (let i = 0; i < canvas.width; i++) {
            let Re = ((this.x_max / 2) - (i + this.x_offset)) / (canvas.width / 2) * this.zoom_factor
            this.array[i] = []
            for (let j = 0; j < canvas.height; j++) {
                let Im = (((this.y_max / 2) - (j + this.y_offset)) / (canvas.height / 2)) * this.zoom_factor
                this.array[i][j] = [Re, Im]
            }
        }
    }

    calculate() {
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.width; j++) {
                const r = algorithm(this.array[i][j], ITERATIONS, 2)
                this.intensity.push(gradient[Math.floor(r % 50)])
            }
        }
    }
    draw() {
        let imgData = ctx.createImageData(canvas.width, canvas.width);
        var i;
        for (i = 0; i < this.intensity.length; i++) {
            let a = this.intensity[i]
            imgData.data[i * 4] = parseInt("0x" + a[1] + a[2])
            imgData.data[i * 4 + 1] = parseInt("0x" + a[3] + a[4]);
            imgData.data[i * 4 + 2] = parseInt("0x" + a[5] + a[6]);
            imgData.data[i * 4 + 3] = 255;
        }

        ctx.putImageData(imgData, 10, 10);
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

    im.draw()
    let t1 = performance.now();
    console.log(t1 - t0)
}

const CONSTANT = [-0.7, -0.4]
const ITERATIONS = 250
let zoom = 1
im = new Image(1, 0.5, 0);

document.addEventListener("wheel", async function (event) {
    let delta = Math.sign(event.deltaY)
    im.zoom = im.zoom - (im.zoom * 0.5 * delta)
    im.x_offset = im.x_offset - (im.x_offset * 0.5 * delta)
    im.y_offset = im.y_offset - (im.y_offset * 0.5 * delta)
    setTimeout(main(), 100)
})
document.addEventListener("keydown", function (event) {
    let key = event.keyCode
    if (key == 38) {
        im.x_offset = im.x_offset - (0.25 * canvas.width)
        main()
    }
    else if (key == 37) {
        im.y_offset = im.y_offset - (0.25 * canvas.height)
        main()
    }
    else if (key == 40) {
        im.x_offset = im.x_offset + (0.25 * canvas.width)
        main()
    }
    else if (key == 39) {
        im.y_offset = im.y_offset + (0.25 * canvas.height)
        main()
    }

})



let gradient = ["#FF0000", "#EB0013", "#D80027", "#C5003A", "#B1004E", "#9E0062", "#8B0075", "#770089", "#64009C", "#5100B0", "#3D00C4", "#2A00D7", "#1700EB", "#0400FF", "#1814E9", "#2D29D4", "#423DBF", "#5752AA", "#6C6694", "#817B7F", "#96906A", "#ABA455", "#C0B93F", "#D5CD2A", "#EAE215", "#FFF700", "#F3E215", "#E7CD2A", "#DCB93F", "#D0A455", "#C4906A", "#B97B7F", "#AD6694", "#A152AA", "#963DBF", "#8A29D4", "#7E14E9", "#7300FF", "#7E00E9", "#8A00D4", "#9600BF", "#A100AA", "#AD0094", "#B9007F", "#C4006A", "#D00055", "#DC003F", "#E7002A", "#F30015", "#FF0000"]

main(1, 0.5, 0)

