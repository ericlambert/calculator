// A simple calculator per Odin Project exercise.
// 	"an on-screen calculator using JavaScript, HTML and CSS"
// https://www.theodinproject.com/courses/web-development-101/lessons/calculator?ref=lnav

let mCurrent = []; // current input memory
let mPrevious = [] // previous input memory

let allDigits = Array.from(document.getElementsByClassName("digit"));
let allOptions = Array.from(document.getElementsByClassName("option"));
let allOperations = Array.from(document.getElementsByClassName("operation"));
let allExecutes = Array.from(document.getElementsByClassName("execute"));

allDigits.forEach(button => button.addEventListener("click", function(){
	let last = mCurrent[mCurrent.length-1];

	if (isNumeric(last)) {
		mCurrent.pop()
		mCurrent.push(last + button.innerHTML)
	} else {
		mCurrent.push(button.innerHTML);
	}
	
	updateDisplay();}));
allOptions.forEach(button => button.addEventListener("click", function(){
	if (mCurrent.length > 0) {
		const buttonText = button.innerHTML;

		switch (buttonText) {
			case 'C':
				clearAllMemory();
				updateDisplay();
				break;
			case '±':
				switchSigns()
				updateDisplay();
				break;
			case '%':
				makePercent();
				updateDisplay();
				break;
			default:
				break;
		}
	}}));
allOperations.forEach(button => button.addEventListener("click", function(){
	mPrevious.length = 0;
	mPrevious.push(mCurrent.join(''));
	mPrevious.push(button.innerHTML);
	mCurrent.length = 0;
	mCurrent.push(mPrevious.join(''));
	updateDisplay();
}));

function operate (operator,a,b) {
	switch (operator) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		default:
			return 'Invalid operator';
	}}
function add (a,b) { return this.operate('+',a,b);}
function subtract (a,b) { return this.operate('-',a,b);}
function multipy (a,b) { return this.operate('*',a,b);}
function divide (a,b) { return this.multipy(a,1/b);}

function clearAllMemory() { 
	mCurrent.length = 0;
	mPrevious.length = 0;
}
function updateDisplay() {
	let displayText = (mCurrent[0] != null) ? mCurrent.join('') : 0;
	document.getElementById("display").innerHTML = displayText;}
function switchSigns() {
	if (mCurrent.length > 0) {
		let switched = mCurrent[mCurrent.length - 1] * -1;
		mCurrent[mCurrent.length - 1] = switched;
	};}
function makePercent() {
	if (mCurrent.length > 0) {
		let percent = mCurrent[mCurrent.length - 1] / 100;
		mCurrent[mCurrent.length - 1] = percent;
	};}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

