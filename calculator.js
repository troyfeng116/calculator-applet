var resDisplay = document.getElementById("res");
var numButtons = document.getElementsByClassName("numButtons");
for (var i = 0, len = numButtons.length; i < len; i++) {
	let x = numButtons[i].innerHTML;
    numButtons[i].onclick = function() {
    	displayInResult(x);
    }
}

var opButtons = document.getElementsByClassName("opButtons");
for (var i = 0, len = opButtons.length; i < len; i++) {
	let x = opButtons[i].innerHTML;
	opButtons[i].onclick = function() {
		displayInResult(x);
	}
}

var clearButton = document.getElementById("btnClr");
clearButton.onclick = function() {
	clearDisplay();
}

var decimalButton = document.getElementById("btnDec");
decimalButton.onclick = function() {
	displayInResult(decimalButton.innerHTML);
}

function displayInResult(x) {
	resDisplay.innerHTML += x;
}

function clearDisplay() {
	resDisplay.innerHTML = "";
}

function displayError() {
	resDisplay.innerHTML = "Invalid input";
}