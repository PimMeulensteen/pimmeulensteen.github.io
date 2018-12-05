const is_in_corner = function (i, j, offset_i, offset_j) {
    return (i - offset_i) > -1 && (j - offset_j) > -1 && (i - offset_i) < 7 && (j - offset_j) < 7
}
const is_corner_id = function (i, j, offset_i, offset_j) {
    return (i - offset_i) > -1 && (j - offset_j) > -1 && (i - offset_i) < 7 && (j - offset_j) < 7 && ((i - offset_i) != 5 && (i - offset_i) != 1 || (j - offset_j) == 0 || (j - offset_j) == 6) && ((j - offset_j) != 5 && (j - offset_j) != 1 || (i - offset_i) == 0 || (i - offset_i) == 6)
}


const is_timing = function (i, j) {
    return (i == 6 && j % 2 == 0) || (j == 6 && i % 2 == 0)
}
const is_in_timing = function (i, j, size) {
    return (i == 6 && j > 7 && j < size - 8) || (j == 6 && i > 7 && i < size - 8)
}

const is_in_safe_zone = function (i, j, size) {
    return (i == 7 && j < 8) || (j == 7 && i < 8) || (i == 7 && j > size - 8) || (j == size - 8 && i < 8) || (size - i == 8 && j < 8) || (j == 7 && i > size - 8)
}

const is_in_format = function (i, j, size) {
    return (i == 8 && j != 6 && (j < 9|| j > size-9)) || (j == 8 && i != 6 && (i < 9 || i > size - 9)) 
}

class Cell {
    constructor(color, type, shade) {
        this.color = color
        this.type = 'recognition'
        this.shade = shade
    }
}


class QrCode {
    constructor(size) {
        this.size = size
        this.pixelsize = 20
        this.data = []
        for (let i = 0; i < size; i++) {
            let sub_array = []
            for (let j = 0; j < size; j++) {
                //Check if in ID corner
                if (is_in_corner(i, j, 0, 0) || is_in_corner(i, j, this.size - 7, 0) || is_in_corner(i, j, 0, this.size - 7)) {
                    if (is_corner_id(i, j, 0, 0) || is_corner_id(i, j, this.size - 7, 0) || is_corner_id(i, j, 0, this.size - 7)) {
                        sub_array.push(new Cell('black', 'id', 'blue'))
                    } else {
                        sub_array.push(new Cell('white', 'id', 'blue'))
                    }
                }
                //Check if in save zone around ID
                else if (is_in_safe_zone(i, j, this.size)) {
                    sub_array.push(new Cell('white', 'safe', 'green'))
                }


                //check if in timing function
                else if (is_in_timing(i, j, this.size)) {
                    if (is_timing(i, j)) {
                        sub_array.push(new Cell('black', 'timing', 'red'))
                    } else {
                        sub_array.push(new Cell('white', 'timing', 'red'))
                    }


                }
                //Check if in format info zone 
                else if (is_in_format(i, j, this.size)) {

                    sub_array.push(new Cell('white', 'timing', 'orange'))



                }

                //Else, make the pixel white
                else {
                    sub_array.push(new Cell('#ffffff', 'a', 'white'))
                }

            }
            this.data.push(sub_array)
        }
    }
    show(parent) {


        let a = document.createElement('canvas')
        let ctx = a.getContext('2d')
        a.width = this.pixelsize * this.size;
        a.height = this.pixelsize * this.size;
        parent.appendChild(a)
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                //set a background rectangle as 'shade'
                if (this.data[i][j].shade != 'white') {
                    ctx.fillStyle = this.data[i][j].shade
                    ctx.fillRect(i * this.pixelsize, j * this.pixelsize, this.pixelsize, this.pixelsize)
                }


                //Fill the actual pixel

                ctx.fillStyle = this.data[i][j].color;
                ctx.fillRect(i * this.pixelsize + 1, j * this.pixelsize + 1, this.pixelsize - 2, this.pixelsize - 2)




            }
        }
    }
}

let a = new QrCode(21)
a.pixelsize = 32
a.show(document.getElementsByTagName('body')[0])
