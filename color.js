// THE GREAT RGB Color GAME
// Author: Chung Hak Ngor

const reset = document.getElementById("new");
const modes = document.querySelectorAll(".mode");
const squares = document.querySelectorAll(".square");
const topBanner = document.getElementById("topBanner");
const outputText = document.getElementById("outputText");

// default starting setting
let totalSquares = 6;
let currentMode = "Medium";

// new game/colors
let correct = Math.floor(Math.random() * totalSquares);
let answer = squares[correct].style.backgroundColor.slice(3);

// check the current difficulity of the game
const checkMode = (currentMode) => {
	switch (currentMode) {
		case "Easy":
			totalSquares = 3;
			break;
		case "Medium":
			totalSquares = 6;
			break;
		case "Hard":
			totalSquares = 9;
			break;
		default:
			totalSquares = 6;
			break;
	}
};

// display all the square depending on the difficulty of the game
const displaySquares = (num) => {
	for (let index = 0; index < squares.length; index++) {
		index < num ? (squares[index].style.display = "block") : (squares[index].style.display = "none");
	}
};

// update the grid to match the difficulity of the game and generate the first answer
const updateGame = () => {
	[...squares].map((square) => {
		updateColorToRand(square);
	});
	outputText.textContent = "";
	reset.textContent = "New Colors";
	topBanner.style.backgroundColor = "steelblue";
	newAnswer();
	displaySquares(totalSquares);
};

// generates a new answer for the game for a random square
const newAnswer = () => {
	correct = Math.floor(Math.random() * totalSquares);
	answer = squares[correct].style.backgroundColor.slice(3);
	document.getElementById("correctAnswer").textContent = "RGB" + answer;
};

// updates all the square to the correct answer
const updateToAnswerSquare = (color) => {
	[...squares].map((square) => {
		square.style.backgroundColor = "rgb" + color;
	});
	topBanner.style.backgroundColor = "rgb" + color;
};

// check if the answer selected is correct or not
const check_answer = (event) => {
	let squareSelected = event.path[0];
	if (squareSelected.style.backgroundColor.slice(3) === answer) {
		outputText.textContent = "Correct!";
		reset.textContent = "New Game?";
		updateToAnswerSquare(answer);
	} else {
		outputText.textContent = "Try Again!";
		squareSelected.style.backgroundColor = "#232323";
	}
};

const updateColorToRand = (targetSquare) => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	targetSquare.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
	targetSquare.addEventListener("click", (e) => check_answer(e));
};

const changeMode = (event) => {
	const modeSelected = event.path[0];
	[...modes].map((m) => {
		m.classList.remove("selected");
	});
	modeSelected.classList.add("selected");
	checkMode(modeSelected.textContent);
	updateGame();
};

const main = () => {
	reset.addEventListener("click", updateGame);
	[...modes].map((mode) => {
		mode.addEventListener("click", (e) => changeMode(e));
	});
	updateGame();
};

main();
