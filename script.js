const enter = document.getElementById('enter');
const operators = document.querySelectorAll('.operator');
const operatorOthers = document.querySelectorAll('.operatorOther');
const numericals = document.querySelectorAll('.num');
const display = document.getElementById('displayNum');
const onClear = document.getElementById('onClear');
const sideDesigns = document.querySelectorAll('.sideDesign');
const btnDesigns = document.querySelectorAll('.btnDesign');
const decimal = document.getElementById('decimal');
const negBtn = document.getElementById('neg');
const negSign = document.getElementById('negSign');
const mrc = document.getElementById('mrc');
const mMinus = document.getElementById('mMinus');
const mAdd = document.getElementById('mAdd');
const mSign = document.getElementById('mSign');

let operatorList = [];
let numList = ['',''];
let start = false;
let memory = '0';
let mClickOnce = false;

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

function displayNum(num) {
    (String(num).includes('.')) ? decimal.style.display = 'none' : decimal.style.display = 'inline';
    display.textContent = String(num).replace('-','');
}

function checkNeg(num) {
    (String(num).includes('-')) ? negSign.style.color = 'Black' : negSign.style.color = 'rgba(49, 53, 49, 0.295)';
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
            displayNum(numList[0]);
            checkNeg(numList[0]);
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
            displayNum(sqrtnum);
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
        btn.parentNode.classList.contains('num') ? currClass = 'btnBoxNum' : currClass = 'btnBox';
        for(let i = 0; i < 27; i++) {
            let div = document.createElement('div');
            div.classList.add(currClass);
            btn.appendChild(div);
        }
    })

    operators.forEach((operator) => {operator.addEventListener('click', () => { 
        if (start) {
            if (!numList.includes('')) {
                operateSteps(operatorList.length-numList.length, numList[0]);
                displayNum(numList[0]);
                checkNeg(numList[0]);
            }
            operatorList.push(operator.id);
        }
    })});
    
    operatorOthers.forEach((operator) => {operator.addEventListener('click', () => {operateOther(operator.id)})});
    enter.addEventListener('click', () => {
        if (start) {
            console.log(operatorList);
        if (operatorList) {
            operateSteps(operatorList.length-numList.length, numList[0]);
        }
        displayNum(numList[0]);
        checkNeg(numList[0]);
        }
    });

    negBtn.addEventListener('click', () => {
        if (start) {
            let negated = 0;
        if (numList[numList.length-1] !== '') {
            negated = numList.pop() * -1;
            numList.push(String(negated));
        }
        else {
            negated = numList[0] * -1;
            numList[0] = String(negated);
        }
        checkNeg(negated);
        }
    });

    mrc.addEventListener('click', () => {
        if (start) {
            if (mClickOnce === false) {
                displayNum(memory);
                checkNeg(memory);
                mSign.style.color = 'Black';
                mClickOnce = true;
            }
            else {
                displayNum(memory);
                checkNeg(memory);
                numList[0] = parseFloat(memory);
                memory = '0';
                mSign.style.color = 'rgba(49, 53, 49, 0.295)';
                mClickOnce = false;
            }
        }
    });

    mAdd.addEventListener('click', () => {
        if (start) {
            operateSteps(operatorList.length-numList.length, numList[0]);
            memory = parseFloat(memory) + parseFloat(numList[0]);
            displayNum(numList[0]);
            checkNeg(numList[0]);
            mSign.style.color = 'Black';
        }
    });

    mMinus.addEventListener('click', () => {
        if (start) {
            operateSteps(operatorList.length-numList.length, numList[0]);
            memory = parseFloat(memory) - parseFloat(numList[0]);
            displayNum(numList[0]);
            checkNeg(numList[0]);
            mSign.style.color = 'Black';
        }
    });

    numericals.forEach((number) => {number.addEventListener('click', () => {
        display.parentNode.style.color = 'Black';
        start = true;
        if(numList[0] === '0') {
            numList[0] = '';
        }
        if (operatorList.length > 0) {           
            if (operatorList.length-numList.length === -2) {
                numList.splice(-2, 1);
            }
            numList[numList.length-1] += number.firstChild.textContent;
            displayNum(numList[numList.length-1]);
            checkNeg(numList[numList.length-1]);
        }
        else if (typeof numList[0] !== 'string'){
            numList[0] = number.firstChild.textContent;
            displayNum(numList[0]);
            checkNeg(numList[0]);
            }
        else {
            numList[0] += number.firstChild.textContent;
            displayNum(numList[0]);
            checkNeg(numList[0]);
        }
    })});

    onClear.addEventListener('click', () => {
        display.parentNode.style.color = 'Black';
        start = true;
        operatorList = [];
        numList = ['0',''];
        displayNum(numList[0]);
    });
    
}

calculates()    