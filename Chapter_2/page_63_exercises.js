var temp = 81;
var willRain = true;
var humid = (temp > 80 && willRain == true);
// What’s the value of humid?
// true
var guess = 6;
var isValid = (guess >= 0 && guess <= 6);
// What’s the value of isValid?
// true
var keyPressed = "N";
var points = 142;
var level;
if (keyPressed == "Y" ||
(points > 100 && points < 200)) {
level = 2;
} else {
level = 1;
}
// What’s the value of level?
// 2

var kB = 1287;
var tooBig = (kB > 1000);
var urgent = true;
var sendFile = (urgent == true || tooBig == false);
// What’s the value of sendFile?
// true
