// var word = "bottles";
// var count = 2;
// while (count > 0) {

// if(count==1){
//     console.log(count + " " + "bottle" + " of beer on the wall");
// console.log(count + " " + "bottle" + " of beer,");
// console.log("Take one down, pass it around,");
// count = count - 1;

// }
//  if(count == 0) {
//     console.log("No more " + word + " of beer on the wall.");
// count = count - 1;

// }
// else  {
//     console.log(count + " " + word + " of beer on the wall");
//     console.log(count + " " + word + " of beer,");
//     console.log("Take one down, pass it around,");
//     count = count - 1;

// }

// }

// console.log(count + " " + word + " of beer on the wall");
// console.log(count + " " + word + " of beer,");
// console.log("Take one down, pass it around,");

var word = "bottles";
var count = 99;
while (count > 0) {
	console.log(count + " " + word + " of beer on the wall");
	console.log(count + " " + word + " of beer,");
	console.log("Take one down, pass it around,");
	count = count - 1;
	if (count == 1) {
		word = "bottle";
	}
	if (count == 0) {
		word = "bottles";
		console.log("No more " + word + " of beer on the wall.");
		console.log("Go to the store and buy some more"),
		console.log("99 bottles of beer on the wall.");
	}
}
