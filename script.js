const enter = document.getElementById('enter');
const operators = document.querySelectorAll('.operator');
const operatorOthers = document.querySelectorAll('.operatorOther');
const numericals = document.querySelectorAll('.num');
const display = document.getElementById('inputOutput');
const onClear = document.getElementById('onClear');
const sideDesigns = document.querySelectorAll('.sideDesign');
const btnDesigns = document.querySelectorAll('.btnDesign');

let operatorList = [];
let numList = ['',''];

function checkListSize(amtRepeat, numRepeat) {
    for (let i=0; i <= amtRepeat; i++) {
        numList.splice(1, 0, numRepeat);
    };
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

function operateSteps(amtRepeat, numRepeat) {
    numList = numList.filter((num) => num !== '');
    checkListSize(amtRepeat, numRepeat);
    operatorList.reverse();
    numList = numList.reverse();
    numList = numList.map((num) => {return parseFloat(num)});
    operate();
    numList.push('');
}

function operateOther(operator) {
    let sqrtnum = 0;
    // +1 because yet to filter ''
    checkListSize(operatorList.length-numList.length+1, numList[0]);

    switch (operator) {
        case 'percent':
            // same case pop single number
            numList = numList.filter((num) => num !== '');
            numList.push(percent(parseFloat(numList.pop())));
            if (operatorList) {
                operateSteps(operatorList.length-numList.length, numList[0]);
            }
            display.textContent = numList[0];
            break;
        case 'sqrt':
            // pop doesnt work for single number
            if (numList.includes('')) {
                sqrtnum = sqrt(parseFloat(numList[0]));
                numList.splice(-2, 1, sqrtnum);
            }
            else {
                sqrtnum = sqrt(parseFloat(numList.pop()));
                numList.push(sqrtnum);
            }
            display.textContent(sqrtnum);
            break;
    }
}

function calculates() {
    sideDesigns.forEach((side) => {
        for(let i = 0; i < 80; i++) {
            let div = document.createElement('div');
            div.classList.add('sideBox');
            side.appendChild(div);
        }
    })

    btnDesigns.forEach((btn) => {
        let currClass = '';
        if (btn.parentNode.classList.contains('num')){
            currClass = 'btnBoxNum';
        }
        else {
            currClass = 'btnBox';
        }
        for(let i = 0; i < 27; i++) {
            let div = document.createElement('div');
            div.classList.add(currClass);
            btn.appendChild(div);
        }
    })

    operators.forEach((operator) => {operator.addEventListener('click', () => { 
        if (!numList.includes('')) {
            operateSteps(operatorList.length-numList.length, numList[0]);
            display.textContent = numList[0];
        }
        operatorList.push(operator.id);
    })});
    
    operatorOthers.forEach((operator) => {operator.addEventListener('click', () => {operateOther(operator.id)})});

    numericals.forEach((number) => {number.addEventListener('click', () => {
        if (operatorList.length > 0) {
            if (operatorList.length-numList.length === -2) {
                numList.splice(-2, 1);
            }
            numList[numList.length-1] += number.textContent;
            display.textContent = numList[numList.length-1];
        }
        else {
            numList[0] += number.textContent;
            display.textContent = numList[0];
        }
    })});

    enter.addEventListener('click', () => {
        if (operatorList) {
            operateSteps(operatorList.length-numList.length, numList[0]);
        }
        display.textContent = numList[0];
    });

    onClear.addEventListener('click', () => {
        operatorList = [];
        numList = ['',''];
        display.textContent = 0;
    });
}

calculates()    