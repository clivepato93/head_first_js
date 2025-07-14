var scores = [
	60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69,
	64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44,
];
var costs = [
	0.25, 0.27, 0.25, 0.25, 0.25, 0.25, 0.33, 0.31, 0.25, 0.29, 0.27, 0.22, 0.31,
	0.25, 0.25, 0.33, 0.21, 0.25, 0.25, 0.25, 0.28, 0.25, 0.24, 0.22, 0.2, 0.25,
	0.3, 0.25, 0.24, 0.25, 0.25, 0.25, 0.27, 0.25, 0.26, 0.29,
];

function printAndGetHighScore() {
	let maxNum = 0;
	for (let i = 0; i < scores.length; i++) {
		if (maxNum < scores[i]) {
			maxNum = scores[i];
		}
	}
	return maxNum;
}

function getHighScoreIndexes(highScore) {
	const highScoreIndexes = [];
	for (let i = 0; i < scores.length; i++) {
		if (scores[i] == highScore) {
			highScoreIndexes.push(i);
		}
	}
	return highScoreIndexes;
}

function printAndGetLowCost(scores,costs,highScore) {
	let currentLow = 1;
	let index;
	for (let i = 0; i < scores.length; i++) {
		if (currentLow > costs[i] && scores[i] == highScore) {
			currentLow = costs[i];
			index = i;
		}
	}
	return index;
}

// console.log("\n");

const highScore = printAndGetHighScore(scores);
console.log("Bubbles tests: " + scores.length);
console.log("Highest bubble score: " + highScore);
console.log("Solutions with highest score: " + getHighScoreIndexes(highScore));
const mostCostEffective = printAndGetLowCost(scores, costs, highScore);
console.log("Bubble Solution #" + mostCostEffective + " is the most cost effective");
