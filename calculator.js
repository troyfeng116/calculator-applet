var res = document.getElementById("res");
var expDisplay = document.getElementById("exp");
var ac = false;
var justDisplayedAnswer = false;
var justDisplayedEqual = false;
var ans = 0;
var chunk = 1;
var curPM = '#';
var curMD = '#';

var numButtons = document.getElementsByClassName("numButtons");
for (var i = 0, len = numButtons.length; i < len; i++) {
	let x = numButtons[i].innerHTML;
    numButtons[i].onclick = function() {
    	if (justDisplayedAnswer) {
    		clearRes();
    		justDisplayedAnswer = false;
    	}
    	if (justDisplayedEqual) {
    		clearExp();
    		ans = 0;
    		chunk = 1;
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

var opButtons = document.getElementsByClassName("opButtons");
for (var i = 0, len = opButtons.length; i < len; i++) {
	let op = opButtons[i].innerHTML;
	opButtons[i].onclick = function() {
		appendToExpDisplay(op);
		opClicked(op);
	}
}

var clearButton = document.getElementById("btnClr");
clearButton.onclick = function() {
	if (ac) {
		clearExp();
		clearRes();
		ans = 0;
		chunk = 1;
		justDisplayedAnswer = false;
		justDisplayedEqual = false;
		curPM = '#';
		curMD = '#';
		return;
	}
	var r = res.innerHTML.length;
	var len = expDisplay.innerHTML.length;
	expDisplay.innerHTML = expDisplay.innerHTML.substring(0,len-r);
	ac = true;
	clearButton.innerHTML = "AC";
	clearRes();
}

var decimalButton = document.getElementById("btnDec");
decimalButton.onclick = function() {
	appendToExpDisplay(decimalButton.innerHTML);
}

var equalsButton = document.getElementById("btnEql");
equalsButton.onclick = function() {
	opClicked('=');
	expDisplay.innerHTML = ans;
	displayAnsSoFar();
	justDisplayedEqual = true;
	ac = true;
	clearButton.innerHTML = "AC";
}

function displayAnsSoFar() {
	res.innerHTML = ans;
}

function displayChunkSoFar() {
	res.innerHTML = chunk;
}

function appendToExpDisplay(x) {
	expDisplay.innerHTML += x;
}

function appendToResDisplay(x) {
	res.innerHTML += x;
}

function opClicked(newOp) {
	var thisTerm = res.innerHTML;
	var x = parseInt(thisTerm,10);
	if (justDisplayedEqual) {
		justDisplayedEqual = false;
		if (newOp=='+' || newOp=='-') {
			curPM=newOp;
			ansSoFar = x;
			displayAnsSoFar();
		}
		else if (newOp=='*' || newOp=='/') {
			curMD=newOp;
			chunk = x;
			displayChunkSoFar();
		}
		return;
	}
	if (curMD=='*') chunk *= x;
	else if (curMD=='/') chunk /= x;
	else if (curMD=='#') chunk = x;

	if (newOp=='+' || newOp=='-') {
		if (curPM == '+') ans += chunk;
		else if (curPM == '-') ans -= chunk;
		else if (curPM == '#') ans = chunk;
		displayAnsSoFar();
		chunk = 1;
		curPM = newOp;
		curMD = '#';
	}
	else if (newOp=='*' || newOp=='/') {
		displayChunkSoFar();
		curMD = newOp;
	}
	else if (newOp=='=') {
		if (curPM == '+') ans += chunk;
		else if (curPM == '-') ans -= chunk;
		else if (curPM == '#') ans = chunk;	
		displayAnsSoFar();
		chunk = 1;
		curPM = '#';
		curMD = '#';
	}
	justDisplayedAnswer = true;
}

function clearRes() {
	res.innerHTML = "";
}

function clearExp() {
	expDisplay.innerHTML = "";
}

function displayError() {
	res.innerHTML = "Invalid input";
}

function removeLastNum(exp) {
	var reg = /(\+)|(\*)|-|(\/)/;
	var i = exp.lastIndexOf(reg);
	return i>=0 ? exp.substring(0,i+1) : "";
}

function eval(exp) {
	displayError();
	justDisplayedAnswer = true;
}
