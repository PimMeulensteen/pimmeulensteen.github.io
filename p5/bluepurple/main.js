function setup() {
  grid = 11
  size = 80
  //Caluclate amount of grid positions for both x and y
  x_grid = windowWidth / 80
  y_grid = windowHeight / 80
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  angle = 0

}

function draw() {
  background(0)
  angle += 2
  for (i = 0; i < x_grid; i++) {
    c1x = i * size - sin(angle + 45 * i) * size/2 + size/2
    c2x = i * size + sin(angle + 45 * i) * size/2 + size/2
    c3c4x = i * size + size/2
    for (j = 0; j < y_grid; j++) {
      //Calcuate the coordinates
      c1 = [c1x,
        j * size + size/2
      ]
      c2 = [c2x,
        j * size + size/2
      ]
      c3 = [c3c4x,
        j * size + sin(angle + 90 + 90 * j) * size/2 + size/2
      ]
      c4 = [c3c4x,
        j * size + sin(angle + 90 * j) * size/2 + size/2
      ]

      //Fill with a gradient
      fill(223 - (223 / grid) * j,
        (70 / grid) * j,
        112 + ((164 - 112) / grid) * j)
      stroke(0)

      //Draw the shape
      quad(c1[0], c1[1], c3[0], c3[1], c2[0], c2[1], c4[0], c4[1])
    }
  }
}