const enter = document.getElementById('enter');
const operators = document.querySelectorAll('.operator');
const operatorOthers = document.querySelectorAll('.operatorOther');
const numericals = document.querySelectorAll('.num');
const display = document.getElementById('inputOutput');

let operatorList = [];
let numList = ["",""];

function checkListSize(amtRepeat, numRepeat) {
    console.log(amtRepeat);
    for (let i=0; i <= amtRepeat; i++) {
        numList.splice(1, 0, numRepeat);
    };
    console.log('here');
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
    // +1 because yet to filter ''
    checkListSize(operatorList.length-numList.length+1, numList[0]);

    switch (operator) {
        case 'percent':
            // same case pop single number
            numList = numList.filter((num) => num !== '');
            numList.push(percent(parseFloat(numList.pop())));
            console.log(numList);
            console.log(operatorList);
            if (operatorList) {
                checkListSize(operatorList.length-numList.length, numList[0]);
                operatorList.reverse();
                numList.reverse();
                numList = numList.map((num) => {return parseFloat(num)});
                operate();
                numList.push('');
            }
            console.log(numList);
            display.textContent = numList[0];
            break;
        case 'sqrt':
            // pop doesnt work for single number
            if (numList.includes('')) {
                numList.splice(-2, 1, sqrt(parseFloat(numList[0])));
            }
            else {
                numList.push(sqrt(parseFloat(numList.pop())));
            }
            console.log(numList);
            break;
    }
}

function calculates() {
    operators.forEach((operator) => {operator.addEventListener('click', () => { 
        if (!numList.includes('')) {
            checkListSize(operatorList.length-numList.length, numList[0]);
            operatorList.reverse();
            numList = numList.reverse().filter((num) => num !== '');
            numList = numList.map((num) => {return parseFloat(num)});
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
        if (operatorList.length > 0) {
            if (operatorList.length-numList.length === -2) {
                numList.splice(-2, 1);
            }
            numList[numList.length-1] += number.textContent;
            display.textContent = numList[numList.length-1]
        }
        else {
            numList[0] += number.textContent;
        }
    })});

    enter.addEventListener('click', () => {
        console.log(operatorList);
        console.log(numList);
        if (operatorList) {
            numList = numList.filter((num) => num !== '');
            checkListSize(operatorList.length-numList.length, numList[0]);
            operatorList.reverse();
            numList = numList.reverse();
            numList = numList.map((num) => {return parseFloat(num)});
            operate();
            numList.push('');
        }
        display.textContent = numList[0];
    });
}

calculates()    