const enter = document.getElementById('enter');
const operators = document.querySelectorAll('.operator');
const numericals = document.querySelectorAll('.num');
const display = document.getElementById('inputOutput');

let operatorList = [];
let numList = ["",""];

function add(num1, num2) {
    return num2 ? num1 + num2 : num1 + num1;
}

function subtract(num1, num2) {
    return num2 ? num1 - num2 : num1 - num1;
}
function multiply(num1, num2) {
    return num2 ? num1 * num2 : num1 * num1;
}

function divide(num1, num2) {
    return num2 ? num1 / num2 : num1 / num1;
}

function percent(num) {
    return num/100;
}

function sqrt(num) {
    return Math.sqrt(num);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2);
        case 'percent':
            return percent(num1);
        case 'sqrt':
            return sqrt(num1);
    }
}

function calculates() {
    console.log('here');
    operators.forEach((operator) => {operator.addEventListener('mousedown', () => {operatorList.push(operator.id)})});
    numericals.forEach((number) => {number.addEventListener('mousedown', () => {
        (operatorList.length === 1)? numList[0] += number.textContent : numList[1] += number.textContent;
    })});
    enter.addEventListener('mousedown', () => {
        console.log('here');
        console.log(operatorList);
        console.log(numList);
        display.textContent = operate(operatorList[0], parseInt(numList[0]), parseInt(numList[1]));
    });
}

calculates()