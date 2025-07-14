
function bark(name, weight) {
	if (weight > 20) {
		console.log(name + " says WOOF WOOF");
	} else {
		console.log(name + " says woof woof");
	}
}

bark("juno", 20);
// juno says WOOF WOOF
bark("scottie", -1);
// scottie says woof woof
bark("dino", 0, 0);
// dino says woof woof
bark("fido", "20");
//  fido says WOOF WOOF
bark("lady", 10);
//  lady says woof woof
bark("bruno", 21);
//  bruno says WOOF WOOF