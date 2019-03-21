///Geometirc Pattern
//By Pim Meulensteen
//2019-03-04
//Based on http://sasj.tumblr.com/post/183122983050/geometric-animations-190228

function setup() {
  size = 80
  //Caluclate amount of grid positions for both x and y
  x_grid = windowWidth / 80
  y_grid = windowHeight / 80

  //Precalucate variables to save processing time
  size = 80
  y_size_over_grid = 80
  x_size_over_grid_2 = 80 / 2
  y_size_over_grid_2 = 80 / 2


  //Init sketch
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  angle = 0
  noStroke()

}

function draw() {
  //Center the all the objects
  translate(size / 2, size / 2)
  background("#008080")

  //For every element in a 11x11 grid
  for (i = 0; i < x_grid; i++) {
    for (j = 0; j < y_grid; j++) {
      //Caluclate the corner of every 'object'
      editted_angle = angle - i * 10 - j * 10

      c1 = [i * size - (sin(editted_angle) / 2 + 1) * size / 2,
        (j) * size
      ]
      c2 = [(i) * size,
        (sin(editted_angle) / 2 + 1) * size / 2 + j * size
      ]
      c3 = [i * size + (sin(editted_angle) / 2 + 1) * size / 2,
        (j) * size
      ]
      c4 = [i * size,
        j * size - (sin(editted_angle) / 2 + 1) * size / 2
      ]


      //Fill with a spectrum of colors
      fill("#808080")



      //Draw the object
      quad(c1[0], c1[1],
        c2[0], c2[1],
        c3[0], c3[1],
        c4[0], c4[1])

    }

  }
  angle += 1.5
}