var resDisplay = document.getElementById("res");
var expDisplay = document.getElementById("exp");
var numButtons = document.getElementsByClassName("numButtons");
var ac = false;
var justDisplayedAnswer = false;
var justDisplayedEqual = false;
var ansSoFar = 0;
var thisChunk = 1;
var curOp = '#';

for (var i = 0, len = numButtons.length; i < len; i++) {
	let x = numButtons[i].innerHTML;
    numButtons[i].onclick = function() {
    	if (justDisplayedAnswer) {
    		clearResDisplay();
    		justDisplayedAnswer = false;
    	}
    	if (justDisplayedEqual) {
    		clearExpDisplay();
    		ansSoFar = 0;
    		thisChunk = 1;
			justDisplayedEqual = false;    		
    	}
    	if (ac) {
    		ac = false;
    		clearButton.innerHTML = 'C';
    	}
    	appendToExpDisplay(x);
    	appendToResDisplay(x);
    }
}

var plusButton = document.getElementById("btnSum");
plusButton.onclick = function() {
	appendToExpDisplay("+");
	opClicked();
	curOp = '+';
	thisChunk = 1;
}

var minusButton = document.getElementById("btnSub");
minusButton.onclick = function() {
	if (justDisplayedEqual) {
		expDisplay.innerHTML = resDisplay.innerHTML;
		justDisplayedEqual = false;
	}
	appendToExpDisplay("-");
	opClicked();
	curOp = '-';
	thisChunk = 1;
}

var clearButton = document.getElementById("btnClr");
clearButton.onclick = function() {
	if (ac) {
		clearExpDisplay();
		ansSoFar = 0;
		thisChunk = 1;
	}
	clearResDisplay();
	ac = true;
	clearButton.innerHTML = "AC";
}

var decimalButton = document.getElementById("btnDec");
decimalButton.onclick = function() {
	appendToExpDisplay(decimalButton.innerHTML);
}

var equalsButton = document.getElementById("btnEql");
equalsButton.onclick = function() {
	opClicked();
	appendToExpDisplay("=" + ansSoFar);
	displayAnsSoFar();
	justDisplayedEqual = true;
	ac = true;
	clearButton.innerHTML = "AC";
}

function displayAnsSoFar() {
	resDisplay.innerHTML = ansSoFar;
}

function appendToExpDisplay(x) {
	expDisplay.innerHTML += x;
}

function appendToResDisplay(x) {
	resDisplay.innerHTML += x;
}

function opClicked() {
	var thisTerm = resDisplay.innerHTML;
	var x = parseInt(thisTerm,10);
	if (curOp=='#') {
		ansSoFar = x;
		thisChunk = x;
	}
	else if (curOp=='+') {
		ansSoFar += thisChunk*x;
		displayAnsSoFar();
	}
	else if (curOp=='-') {
		ansSoFar -= thisChunk*x;
		displayAnsSoFar();
	}
	justDisplayedAnswer = true;
}

function clearResDisplay() {
	resDisplay.innerHTML = "";
}

function clearExpDisplay() {
	expDisplay.innerHTML = "";
}

function displayError() {
	resDisplay.innerHTML = "Invalid input";
}

function eval(exp) {
	displayError();
	justDisplayedAnswer = true;
}
