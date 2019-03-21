///Geometirc Pattern
//By Pim Meulensteen
//2019-03-04
//Based on http://sasj.tumblr.com/post/183122983050/geometric-animations-190228

function setup() {
  size = 80
  size_2 = size / 2
  //Caluclate amount of grid positions for both x and y
  x_grid = windowWidth / 80
  y_grid = windowHeight / 80

  //Init sketch
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  angle = 0
  stroke(0)
  fill(0)
}

function draw() {
  background("#f1c711")

  //For every element in the grid
  for (i = 0; i < x_grid; i++) {
    for (j = 0; j < y_grid; j++) {
      //Caluclate the corner of every 'object'
      c1 = [i * size - sin(angle) * size / 2,
        j * size
      ]
      c2 = [(i + 1) * size,
        sin(angle) * size / 2 + j * size
      ]
      c3 = [i * size - sin(angle) * size / 2,
        (j + 1) * size
      ]
      c4 = [i * size,
        j * size + sin(angle) * size / 2
      ]

      //Draw the object
      quad(c1[0], c1[1],
        c2[0], c2[1],
        c3[0], c3[1],
        c4[0], c4[1])
    }
  }
  angle += 1.5
}