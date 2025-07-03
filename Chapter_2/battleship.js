const location1 = Math.floor(Math.random()*5);
const location2 = location1+1;
const location3 = location2+1;
const successfulStrikes = [];

let guesses = 0;
let hits = 3;
let sunk = false;

while (!sunk) {
	const guess = Number(prompt("Ready, aim, fire! (enter a number from 0-6):"));
	if (guess < 0 || guess > 6 || Number.isNaN(guess)) {
		alert("Invalid target");
	} else if (
		guess == location1 ||
		guess == location2 ||
		(guess == location3 && !successfulStrikes.includes(guess))
	) {
		hits -= 1;
        if(hits){
            alert(`Target hit, ${hits} more hit${hits > 1 ? "s" : ""} to go!`);
        }
		successfulStrikes.push(guess);
        if (!hits) {
            alert(`Target hit, no more hits left!`);
		sunk = true;

    }
		guesses += 1;
	} else if (successfulStrikes.includes(guess)) {
		alert(`Target already hit!  `);
	} else {
		alert(`No target hit  ${hits} more hit${hits > 1 ? "s" : ""} to go!`);
		guesses += 1;
	}
	if (!hits) {
		sunk = true;
	}
}

alert(`Game over it took ${guesses} guesses to sink the ship!`+
"which means your shooting accuracy was " + (3/guesses));
