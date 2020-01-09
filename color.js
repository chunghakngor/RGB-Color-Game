var squares = document.querySelectorAll(".square");
var totalSquares = 6;
var reset = document.getElementById('new'); reset.addEventListener("click", updateGame);
var modes = document.querySelectorAll('.mode');
var currentMode = "Medium";

init();
function init(){
    for(var i = 0; i < modes.length; i++){
        modes[i].addEventListener('click', function(){
            for (var index = 0; index < modes.length; index++){modes[index].classList.remove('selected')}
            this.classList.add("selected")
            checkMode(this.textContent)
            updateGame();
        })}
    updateGame();}

function checkMode(currentMode){
    if (currentMode == "Easy"){totalSquares = 3}
    else if (currentMode == "Medium"){totalSquares = 6}
    else {totalSquares = 9};}

function displaySquares(num){
    for (var index = 0; index < squares.length; index++){
        if(index<num){squares[index].style.display = 'block'
        } else{squares[index].style.display = 'none'}}}

// new game/colors
var correct = Math.floor(Math.random() * totalSquares);
var answer = squares[correct].style.backgroundColor.slice(3);

function updateGame(){
    for (let i = 0; i < totalSquares; i++) {
        updateColorToRand(squares[i]);
    reset.textContent = "New Colors";}
    document.getElementById("outputText").textContent = "";
    document.getElementById('topBanner').style.backgroundColor = "steelblue";
    newAnswer();
    displaySquares(totalSquares)};

// generate new answer after reset
function newAnswer() {
    correct = Math.floor(Math.random() * totalSquares);
    answer = squares[correct].style.backgroundColor.slice(3);
    document.getElementById("correctAnswer").textContent = "RGB" + answer;};

function updateColorToRand(targetSquare){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    targetSquare.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    targetSquare.addEventListener("click",check_answer);}

// loop to check if the answer is correct
function check_answer() {
    var output = document.getElementById("outputText");
    if (this.style.backgroundColor.slice(3) === answer) {
        output.textContent = "Correct!";
        reset.textContent = "New Game?";
        updateAll(answer);
    } else{
        output.textContent = "Try Again!";
        this.style.backgroundColor = "#232323";}};

// update when the correct answer is picked
function updateAll(color){
    for (let i = 0; i < totalSquares; i++){
        squares[i].style.backgroundColor = "rgb" + color;
        document.getElementById('topBanner').style.backgroundColor = "rgb" + color}};