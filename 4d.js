
var rotateYZ, rotateXZ, rotateXY, rotateXW, rotateYW, rotateZW;
var roataions = [rotateYZ, rotateXZ, rotateXY, rotateXW, rotateYW, rotateZW]

pi_over_180 = 3.14159265358979323 / 180;

//Array to hold the data of each point
var p = [
  [[0], [0], [0], [0]],
  [[1], [0], [0], [0]],
  [[1], [0], [1], [0]],
  [[0], [0], [1], [0]],
  [[0], [1], [0], [0]],
  [[1], [1], [0], [0]],
  [[1], [1], [1], [0]],
  [[0], [1], [1], [0]],
  [[0], [0], [0], [1]],
  [[1], [0], [0], [1]],
  [[1], [0], [1], [1]],
  [[0], [0], [1], [1]],
  [[0], [1], [0], [1]],
  [[1], [1], [0], [1]],
  [[1], [1], [1], [1]],
  [[0], [1], [1], [1]]
];

//List of list of numbers which make squares.
var planes = [[1, 2, 6, 5], [3, 4, 8, 7], [2, 3, 7, 6], [4, 1, 5, 8], [4, 3, 2, 1], [6, 5, 8, 7], [9, 10, 14, 13], [11, 12, 16, 15], [10, 11, 15, 14], [12, 9, 13, 16], [12, 11, 10, 9], [16, 13, 14, 15], [1, 2, 10, 9], [4, 3, 11, 12], [2, 3, 11, 10], [4, 1, 9, 12], [6, 5, 13, 14], [7, 8, 16, 15], [6, 7, 15, 14], [5, 8, 16, 13], [5, 1, 9, 13], [2, 6, 14, 10], [3, 7, 15, 11], [8, 4, 12, 16]]


//Sine and cosine function which use values in degrees in stead of radians
function s(n) {
  return Math.sin(n * pi_over_180)
}
function c(n) {
  return Math.cos(n * pi_over_180)
}

function generate_multiplication_arrays(YZ = 0, XZ = 0, XY = 0, XW = 0, YW = 0, ZW = 0) {
  //Matrices used to apply roataion to points
  rotateYZ = [
    [1, 0, 0, 0],
    [0, c(YZ), -s(YZ), 0],
    [0, s(YZ), c(YZ), 0],
    [0, 0, 0, 1]]

  rotateXZ = [
    [c(XZ), 0, s(XZ), 0],
    [0, 1, 0, 0],
    [-s(XZ), 0, c(XZ), 0],
    [0, 0, 0, 1]]

  rotateXY = [
    [c(XY), -s(XY), 0, 0],
    [s(XY), c(XY), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]]

  rotateXW = [
    [c(XW), 0, 0, s(XW)],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [-s(XW), 0, 0, c(XW)]]

  rotateYW = [
    [1, 0, 0, 0],
    [0, c(YW), 0, -s(YW)],
    [0, 0, 1, 0],
    [0, s(YW), 0, c(YW)]]

  rotateZW = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, c(ZW), -s(ZW)],
    [0, 0, s(ZW), c(ZW)]]

  roataions = [rotateYZ, rotateXZ, rotateXY, rotateXW, rotateYW, rotateZW]
}

function apply_multiplicaion_arrays() {
  //Use matrix multiplication to apply rotation to the points
  roataions.forEach(function (roation_matrix) {
    p.forEach(function (p_a, index) {
      p[index] = multiplyMatrices(roation_matrix, p[index])
    })
  })
}

function make_plane(a) {
  make_line(a[0], a[1]);
  make_line(a[1], a[2]);
  make_line(a[2], a[3]);
  make_line(a[3], a[0]);
}

function make_line(a, b) {
  a = p[a - 1]
  b = p[b - 1]
  line(a[0] * vertices_length, a[1] * vertices_length, a[2] * vertices_length, b[0] * vertices_length, b[1] * vertices_length, b[2] * vertices_length);
}

function multiplyMatrices(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function rounding(number, precision) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  generate_multiplication_arrays(random(0, 1), random(0, 1), -random(0, 1), -random(0, 1), -random(0, 1), random(0, 1));
  frameRate(27);
  vertices_length = min(windowWidth, windowHeight) / 4; //Length of each site of the 'cube'
}


function draw() {
  background(0);
  stroke(160);

  apply_multiplicaion_arrays(); //Apply rotation

  planes.forEach(function (pl) { //Draw poin
    make_plane(pl);
  });


}
