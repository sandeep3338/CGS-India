let currentInput = '0';
let operator = null;
let firstOperand = null;
let expression = '';


function inputNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    expression += number;
    updateDisplay();
}

function inputOperator(op) {
    if (operator === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        calculateResult();
        firstOperand = parseFloat(currentInput);
    }
    operator = op;
    currentInput = '0';
    expression += ` ${op} `;
    updateDisplay();
}

function inputDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    expression += '.';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    expression = '';
    updateDisplay();
}

function calculateResult() {
    if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(currentInput);
        switch (operator) {
            case '+':
                currentInput = (firstOperand + secondOperand).toString();
                break;
            case '-':
                currentInput = (firstOperand - secondOperand).toString();
                break;
            case '*':
                currentInput = (firstOperand * secondOperand).toString();
                break;
            case '/':
                currentInput = (firstOperand / secondOperand).toString();
                break;
        }
        operator = null;
        firstOperand = null;

        expression = eval(currentInput);
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = expression;
}