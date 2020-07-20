var res = document.getElementById("res");
var expDisplay = document.getElementById("exp");

var ac = false; /* ac is true when clear button is in AC mode (i.e. all cancel) and 
				 * false when in simple C mode (clear). */
var justDisplayedAnswer = false; /* If res contains an intermediate answer, justDisplayedAnswer flips to true. */
var justDisplayedEqual = false; /* If equal button just pressed, justDisplayedEqual flips to true. */
var ans = 0; /* Overall answer thus far. */
var chunk = 1; /* Value of chained multiplication/division. */
var curPM = '#'; /* Previously encountered + or - operator. If none, set to #. */
var curMD = '#'; /* Previously encountered * or / operator. If none, set to #. */

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
    	appendToExp(x);
    	appendToRes(x);
    }
}

var opButtons = document.getElementsByClassName("opButtons");
for (var i = 0, len = opButtons.length; i < len; i++) {
	let op = opButtons[i].innerHTML;
	opButtons[i].onclick = function() {
		appendToExp(op);
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

/* NOTE that decimal functionality not supported yet. */
var decimalButton = document.getElementById("btnDec");
decimalButton.onclick = function() {
	appendToExp(decimalButton.innerHTML);
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

function opClicked(newOp) {
	var thisTerm = res.innerHTML;
	var x = parseInt(thisTerm,10);
	if (x == NaN) {
		displayError();
		return;
	}
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

	if (newOp=='+' || newOp=='-' || newOp=='=') {
		if (curPM == '+') ans += chunk;
		else if (curPM == '-') ans -= chunk;
		else if (curPM == '#') ans = chunk;
		displayAnsSoFar();
		chunk = 1;
		curPM = newOp=='='? '#' : newOp;
		curMD = '#';
	}
	else if (newOp=='*' || newOp=='/') {
		displayChunkSoFar();
		curMD = newOp;
	}
	justDisplayedAnswer = true;
}

function clearRes() {
	res.innerHTML = "";
}

function clearExp() {
	expDisplay.innerHTML = "";
}

function displayAnsSoFar() {
	res.innerHTML = ans;
}

function displayChunkSoFar() {
	res.innerHTML = chunk;
}

function appendToExp(x) {
	expDisplay.innerHTML += x;
}

function appendToRes(x) {
	res.innerHTML += x;
}

function displayError() {
	res.innerHTML = "Invalid input, press C to clear";
}
