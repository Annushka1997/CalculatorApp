"use strict";

const displayButtons = document.querySelectorAll(".mathCalculatorNumbers button");
const displayInput = document.querySelector(".mathCalculatorInput input");
const displayResult = document.querySelector("#calculatorResults");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");
const ans = document.querySelector("#ans");
const calculatorResults = document.querySelector("#calculatorResults");

let lastAnswer = 0;

function evaluateExpression() {
    const expression = displayInput.value.trim();
    if (expression.length === 0) {
        return;
    }

    try {
        const result = calculateExpression(expression);
        lastAnswer = result;
        displayResult.innerHTML += `<p>${expression} = ${result}</p>`;
        displayInput.value = "";
        localStorage.setItem("calculatorResult", displayResult.innerHTML);
        scrollToBottom();
    } catch (error) {
        displayResult.innerHTML += `<p>Error: ${error.message}</p>`;
        displayInput.value = "";
        scrollToBottom();
    }
}

function calculateExpression(expression) {
    const operators = {
        '+': {
            precedence: 1,
            operate: (a, b) => a + b
        },
        '-': {
            precedence: 1,
            operate: (a, b) => a - b
        },
        '*': {
            precedence: 2,
            operate: (a, b) => a * b
        },
        '/': {
            precedence: 2,
            operate: (a, b) => a / b
        }
    };

    const tokens = expression.match(/\d+(\.\d+)?|[+\-*/()]|\S+/g);

    const operands = [];
    const operatorsStack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token in operators) {
            const currentOperator = operators[token];

            if (
                token === '-' &&
                (i === 0 || tokens[i - 1] === '(')
            ) {

                const nextToken = tokens[i + 1];
                if (nextToken && !isNaN(parseFloat(nextToken))) {
                    const number = -parseFloat(nextToken);
                    operands.push(number);
                    i++; 
                    continue;
                }
            }

            while (
                operatorsStack.length > 0 &&
                operatorsStack[operatorsStack.length - 1] !== '(' &&
                currentOperator.precedence <= operators[operatorsStack[operatorsStack.length - 1]].precedence
            ) {
                const operator = operatorsStack.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                const result = operators[operator].operate(operand1, operand2);
                operands.push(result);
            }

            operatorsStack.push(token);
        } else if (token === '(') {
            operatorsStack.push(token);
        } else if (token === ')') {
            while (operatorsStack.length > 0 && operatorsStack[operatorsStack.length - 1] !== '(') {
                const operator = operatorsStack.pop();
                const operand2 = operands.pop();
                const operand1 = operands.pop();
                const result = operators[operator].operate(operand1, operand2);
                operands.push(result);
            }

            if (operatorsStack.length === 0 || operatorsStack[operatorsStack.length - 1] !== '(') {
                throw new Error('Invalid expression');
            }

            operatorsStack.pop(); 
        } else {
            const number = parseFloat(token);
            if (isNaN(number)) {
                throw new Error(`Invalid number: ${token}`);
            }
            operands.push(number);
        }
    }

    while (operatorsStack.length > 0) {
        const operator = operatorsStack.pop();
        if (operator === '(') {
            throw new Error('Invalid expression');
        }
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = operators[operator].operate(operand1, operand2);
        operands.push(result);
    }

    if (operands.length !== 1 || operatorsStack.length !== 0) {
        throw new Error('Invalid expression');
    }

    return operands[0];
}

function clearCalculator() {
    displayInput.value = "";
    displayResult.textContent = "";
    localStorage.setItem("calculatorResult", "");
    lastAnswer = 0;
}

function handleKeyPress(event) {
    if (event.key === "Enter" && displayInput.value.trim().length > 0) {
        evaluateExpression();
    }
}

function removeLastDigit() {
    displayInput.value = displayInput.value.slice(0, -1);
}

function getLastAnswer() {
    displayInput.value += lastAnswer;
}

function scrollToBottom() {
    calculatorResults.scrollTop = calculatorResults.scrollHeight;
}

function initMathCalculator() {
    displayButtons.forEach(button => {
        if (button.id === "equals") {
            button.addEventListener("click", evaluateExpression);
        } else if (button.id === "clear") {
            button.addEventListener("click", clearCalculator);
        } else if (button.id === "backspace") {
            button.addEventListener("click", removeLastDigit);
        } else {
            button.addEventListener("click", () => {
                const buttonText = button.textContent;
                displayInput.value += buttonText;
            });
        }
    });
    clearButton.addEventListener("click", clearCalculator);
    equalsButton.addEventListener("click", evaluateExpression);
    displayInput.addEventListener("keypress", handleKeyPress);
    ans.addEventListener("click", getLastAnswer);
    const storedResult = localStorage.getItem("calculatorResult");
    if (storedResult) {
        displayResult.innerHTML = storedResult;
    }
    scrollToBottom();
}

export { initMathCalculator };
