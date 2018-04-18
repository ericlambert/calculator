function add (a,b) {
	return this.operate('+',a,b);
}

function subtract (a,b) {
	return this.operate('-',a,b);
}

function multipy (a,b) {
	return this.operate('*',a,b);
}

function divide (a,b) {
	return this.multipy(a,1/b);
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