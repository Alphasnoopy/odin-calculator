const enter = document.getElementById('enter');
const operators = document.querySelectorAll('.operator');
const operatorOthers = document.querySelectorAll('.operatorOther');
const numericals = document.querySelectorAll('.num');
const display = document.getElementById('inputOutput');

let operatorList = [];
let numList = ["",""];

function checkListSize() {
    console.log(numList);
    while (operatorList.length >= numList.length) {
        numList.unshift(numList[0]);
    }
    console.log(numList);
}

function add(num1, num2) {
    return num2 ? num1 + num2 : num1 + num1;
}

function subtract(num1, num2 = num1) {
    return num2 ? num1 - num2 : num1 - num1;
}
function multiply(num1, num2 = num1) {
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

function operate() {
    console.log('here');
    switch (operatorList.pop()) {
        case 'add':
            numList.push(add(numList.pop(), numList.pop()));
            console.log(numList);
            if (operatorList) {
                operate();
            };
            break;
        case 'subtract':
            numList.push(subtract(numList.pop(), numList.pop()));
            if (operatorList) {
                operate();
            };
            break;
        case 'multiply':
            numList.push(multiply(numList.pop(), numList.pop()));
            if (operatorList) {
                operate();
            };
            break;
        case 'divide':
            numList.push(divide(numList.pop(), numList.pop()));
            if (operatorList) {
                operate();
            };
            break;
    }
}

function operateOther(operator) {
    console.log('here');
    switch (operator) {
        case 'percent':
            numList.push(percent(parseFloat(numList.pop())));
            console.log(numList);
            console.log(operatorList);
            if (operatorList) {
                checkListSize();
                operatorList.reverse();
                numList.reverse();
                numList = numList.map((num) => {return parseFloat(num)});
                operate();
                numList.push('');
            }
            console.log(numList);
            break;
        case 'sqrt':
            numList.push(sqrt(parseInt(numList.pop())));
            operatorList.pop();
            console.log(numList);
            break;
    }
}

function calculates() {
    operators.forEach((operator) => {operator.addEventListener('click', () => {
        if (numList[1] !== '') {
            checkListSize();
            operatorList.reverse();
            numList.reverse();
            numList = numList.map((num) => {return parseInt(num)});
            operate();
            numList.push('');
            display.textContent = numList[0];
        }
        operatorList.push(operator.id);
    })});
    
    operatorOthers.forEach((operator) => {operator.addEventListener('click', () => {operateOther(operator.id)})});

    numericals.forEach((number) => {number.addEventListener('click', () => {
        console.log(numList);
        console.log(number);
        (operatorList.length > 0)? numList[1] += number.textContent : numList[0] += number.textContent;
    })});

    enter.addEventListener('click', () => {
        console.log(operatorList);
        console.log(numList);
        if (operatorList) {
            checkListSize();
            operatorList.reverse();
            numList.reverse();
            numList = numList.map((num) => {return parseInt(num)});
            operate();
            numList.push('');
        }
        display.textContent = numList[0];
    });
}

calculates()    