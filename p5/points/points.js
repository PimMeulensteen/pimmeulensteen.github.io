function setup() {
  size = min(windowHeight, windowWidth)
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  middle = size / 2
  square_size = size / 5
}

function draw() {
  //Center the object
  translate((windowWidth-size)/2, (windowHeight-size)/2)
  background(220)
  fill(0)
  strokeWeight(3)
  noFill()

  x1 = cos(frameCount) * sqrt(2 * square_size ** 2) / 2
  y1 = sin(frameCount) * sqrt(2 * square_size ** 2) / 2

  x2 = cos(frameCount + 180) * sqrt(2 * square_size ** 2) / 2
  y2 = sin(frameCount + 180) * sqrt(2 * square_size ** 2) / 2

  //Left side
  draw_lines(middle - square_size + x1, middle + y1)
  draw_lines(middle - square_size + x2, middle + y2)

  //Right side
  draw_lines(middle + square_size + x1, middle - y1)
  draw_lines(middle + square_size + x2, middle - y2)
}

function draw_lines(point_x, point_y) {
  //Function to draw lines from the points from the paramter to 8 other points
  line(point_x, point_y,
    middle - square_size + x2,
    middle + y2)
  line(point_x, point_y,
    middle - square_size / 2,
    middle - square_size / 2)
  line(point_x, point_y, middle + square_size / 2,
    middle - square_size / 2)
  line(point_x, point_y,
    middle + square_size / 2,
    middle + square_size / 2)
  line(point_x, point_y,
    middle - square_size / 2,
    middle + square_size / 2)
  line(point_x, point_y,
    middle,
    middle + square_size)
  line(point_x, point_y,
    middle,
    middle - square_size)
  line(point_x, point_y,
    middle + square_size,
    middle)
}