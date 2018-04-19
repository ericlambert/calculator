// A simple calculator per Odin Project exercise.
// 	'an on-screen calculator using JavaScript, HTML and CSS'
// https://www.theodinproject.com/courses/web-development-101/lessons/calculator?ref=lnav

let memory = []; // current input memory

let allButtons = Array.from(document.getElementsByTagName('button'));
allButtons.forEach((button => button.addEventListener('click', function(){
	switch (button.className) {
		case 'digit':
		case 'operation':
			handleExpressionInput(button);
			break;
		case 'option':
			handleOptionInput(button);
			break;
		case 'execute':
			handleExecuteInput(button);
			break;
		default:
			break;
	}

	console.log(memory);
})));

function handleExpressionInput(button){
	console.log(button.className);

	let lastInput = (memory.length != 0) ? memory[memory.length - 1] : null ;
	let thisInput = button.innerHTML;

	if (isNumeric(thisInput)){
		if (isNumeric(lastInput) || lastInput == '.') {
			memory.pop();
			memory.push(lastInput + thisInput);
		} else {
			memory.push(thisInput);
		}
	} else {
		if (lastInput != null && isNumeric(lastInput)) {
			memory.push(thisInput);
		} else if (lastInput != null && lastInput != '.') {
			memory.pop();
			memory.push(thisInput);
		}
	}

	updateDisplay();
}

function handleOptionInput(button){
	switch (button.innerHTML) {
		case 'C':
			clearAllMemory();
			break;
		case '±':
			switchSigns();
			break;
		case '%':
			makePercent();
			break;
		case '.':
			makeDecimal();
			break;
		case '←':
			removeLast();
			break;
		default:
			break;
	}

	updateDisplay();
}

function handleExecuteInput(button){
	let lastInput = (memory.length != 0) ? memory[memory.length - 1] : null ; 
	if (memory.length >= 3 && isNumeric(lastInput)) {
		while (memory.length > 1) {
			const calc = operate(memory[1],memory[0],memory[2]);
			memory.shift();
			memory.shift();
			memory.shift();
			memory.unshift(calc);
			console.log(memory);
		}

		updateDisplay();
		console.log(button.className);
	}

	// Not implemented: write a version that handles order of 
	//operations ie. multi and div before add and subtract
}

function add (a,b) { return this.operate('+',a,b); }
function subtract (a,b) { return this.operate('-',a,b); }
function multipy (a,b) { return this.operate('*',a,b); }
function divide (a,b) { return this.operate('*',a,1/b); }

function operate (operator,a,b) {
	a = Number(a);
	b = Number(b);

	if (isNumeric(a) && isNumeric(b)) {
		switch (operator) {
			case '+':
				return a + b;
			case '-':
				return a - b;
			case '*':
			case '×':
				return a * b;
			case '÷':
				return a * (1/b);
			default:
				return 'Invalid operator';
		}
	}
}

function clearAllMemory() { memory.length = 0;}
function updateDisplay() {
	let displayText = (memory.length != 0) ? memory.join('') : 0;
	displayText = (displayText == 'Infinity') ? 'C\'mon!' : displayText;
	document.getElementById('display').innerHTML = (isNumeric(displayText) && String(displayText).includes('.')) ? (displayText * 1).toFixed(2) : displayText;
}
function switchSigns() {
	if (memory.length > 0) {
		let lastInput = memory[memory.length - 1];
		lastInput = (isNumeric(lastInput)) ? lastInput *= -1 : lastInput;
		memory.pop();
		memory.push(lastInput);
	};
}
function makePercent() {
	let lastInput = (memory.length != 0) ? memory[memory.length - 1] : '' ;
	if (memory.length > 0 && isNumeric(lastInput)) {
		let percent = memory[memory.length - 1] / 100;
		memory[memory.length - 1] = percent;
	};
}
function removeLast() {
	let lastInput = (memory.length != 0) ? memory[memory.length - 1] : null ;
	if (lastInput.length > 1) {
		memory[memory.length - 1] = lastInput.replace(lastInput.slice(-1),'');
	} else {
		memory.pop();
	}
}

function makeDecimal() {
	if (memory.length > 0) {
		let lastInput = (memory.length != 0) ? String(memory[memory.length - 1]) : null ;
		if (!lastInput.includes('.')) {
			if (isNumeric(lastInput)) {
				memory.pop();
				memory.push(lastInput + '.');
			} else { memory.push('.')}
			
		}
	} else { memory.push('.') };
}

function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }