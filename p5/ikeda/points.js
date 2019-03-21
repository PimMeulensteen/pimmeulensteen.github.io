//https://en.wikipedia.org/wiki/Ikeda_map

//Changing these variables will influence the drawing 
const x_y_size = 100
const root_n_starting_points = 120
const n_line_segments = 200
const opacity = 3 //of 255
const var_u = 0.6

let factor

function setup() {
  //Set size to fit screen correctly
  const size = min(windowHeight, windowWidth)
  //Zoom factor
  factor = (size / 2) / x_y_size

  createCanvas(windowWidth, windowHeight)
  noLoop()
  background(0)
}

function draw() {
  //Translate origin to middle of the canvas
  translate(windowWidth / 2, windowHeight / 2)
  const renderStart = new Date().getTime()

  //Formating options
  background(0)
  const col = color("white")
  col.setAlpha(opacity)
  noFill()
  stroke(col)
  strokeWeight(1)

  const f2 = (x_y_size * 2) / root_n_starting_points
  for (i = 0; i < root_n_starting_points; i++) {
    for (j = 0; j < root_n_starting_points; j++) {
      //Starting coordinates
      let x1 = i * f2 - x_y_size
      let y1 = j * f2 - x_y_size

      beginShape() //Start a line

      for (n = 0; n < n_line_segments; n++) {
        //Apply the algorithm
        const t = 0.4 - (6) / (1 + x1 * x1 + y1 * y1)
        const cos_t = Math.cos(t)
        const sin_t = Math.sin(t)
        
        const x2 = 1 + var_u * (x1 * cos_t - y1 * sin_t)
        const y2 = var_u * (x1 * sin_t + y1 * cos_t)

        //Update old values for the new values
        x1 = x2
        y1 = y2

        //Add point x,y to the line
        vertex(x1 * factor, y1 * factor)
      }
      endShape() //End the line
    }
  }
  console.log("Rendering took " + (new Date().getTime() - renderStart) + " ms")
}