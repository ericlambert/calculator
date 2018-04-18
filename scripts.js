// A simple calculator per Odin Project exercise.
// 	"an on-screen calculator using JavaScript, HTML and CSS"
// https://www.theodinproject.com/courses/web-development-101/lessons/calculator?ref=lnav

let mCurrent = []; // current input memory
let mPrevious = [] // previous input memory

window.addEventListener('onclick', catchClick);

let allDigits = document.getElementsById("digit");
let allOptions = document.getElementsById("option");
let allOperations = document.getElementsById("operation");
let allExecutes = document.getElementsById("execute");

allDigits.forEach(buttton => button.addEventListener("click", function(){ 
	mCurrent.push(e.innerHTML);
	updateDisplay();
}));


function catchClick(e) {
	const id = e.id;

	switch (id) {
		case 'digit':
			mCurrent.push(e.innerHTML);
			break;
		case 'option':
			handleOptionClicks(e.innerHTML);
			break;
		case 'operation':
			// Not implemented
			break;
		case 'execute':
			// not implemented
			break;
		default:
			break;
	}

	updateDisplay();
}

function handleOptionClicks(e) {
	if (mCurrent.length > 0) {
		const buttonText = e.innerHTML;

		switch (buttonText) {
			case 'C':
				clearCurrentMemory();
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
	}
}

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
	}
}

function add (a,b) { return this.operate('+',a,b);}
function subtract (a,b) { return this.operate('-',a,b);}
function multipy (a,b) { return this.operate('*',a,b);}
function divide (a,b) { return this.multipy(a,1/b);}

function clearCurrentMemory() { mCurrent.length = 0;}

function updateDisplay() {
	let displayText = (mCurrent[0] != null) ? mCurrent.join('') : 0;
	document.getElementById("display").text = displayText;
}

function switchSigns() {
	if (mCurrent.length > 0) {
		let switched = mCurrent.join('') * -1;
		clearCurrentMemory();
		mCurrent.push(switched);
	};
}

function makePercent() {
	if (mCurrent.length > 0) {
		let percent = mCurrent.join('') / 100;
		clearCurrentMemory();
		mCurrent.push(percent);
	};
}



