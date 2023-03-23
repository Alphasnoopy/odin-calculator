const display = document.getElementById('displayNum');
const dot = document.getElementById('dot');
const mSign = document.getElementById('mSign');
const negSign = document.getElementById('negSign');
const eSign = document.getElementById('eSign');

let start = false;
let clearOnce = false;
let mOnce = false;
let currNum = '';
let currOp = '';
let constantNum = '';
let constantOp = '';
let numList = [];
let memory = '';
const ogColor = 'rgba(49, 53, 49, 0.295)';

main();

function main() {
    const allBtns = document.getElementsByTagName('button');

    Array.from(allBtns).forEach(btn => btn.addEventListener('click', () => calculator(btn)));
}

function calculator(btnElement) {
    let btnContent = '';
    const btnID = btnElement.id;
    const btnCategory = (btnElement.classList.length !== 0)? btnElement.className : btnID;

    switch(btnCategory) {
        case ('onClear') :
            start = true;
            mOnce = false;
            display.parentNode.style.color = 'black';
            if (!clearOnce) {
                currNum = '0';
                displayStyle(currNum);
                clearOnce = true;
            }
            else {
                reset();
                clearOnce = false;
            }
            break;
        case ('num') :
            start = true;
            display.parentNode.style.color = 'black';
            if (currNum.replace(/[-.]/g, "").length < 8 && typeof currNum === 'string') {
                if (mOnce) {
                    currNum = '';
                    mOnce = false;
                }
                btnContent = btnElement.firstChild.textContent;

                (currNum === '0')? currNum = btnContent : currNum += btnContent;
                displayStyle(currNum);

                console.log(numList);
                console.log(currNum);
            }
            break;
        case ('decimal') :
            start = true;
            display.parentNode.style.color = 'black';
            if (mOnce) {
                currNum = '0.';
                mOnce = false;
            }
            else if (!currNum.includes('.')) {
                if (currNum === '') currNum = '0';
                currNum += '.';
            }
            displayStyle(currNum);
            break;
        case ('neg') :
            if (start) {
                mOnce = false;
                let negated = 0;
                if (currNum !== '') {
                    negated = currNum * -1;
                    currNum = String(negated);
                    displayStyle(currNum);
                }
                else {
                    numList[0] = numList[0] * -1;
                    displayStyle(numList);
                }
            }
            break;
        case ('operator') :
            if (start) {
                mOnce = false;
                constantNum = '';
                constantOp = '';

                if (currNum !== '') {
                    if (numList.length !== 0) {
                        numList[0] = currNum;
                    }
                    else {
                        numList.push(currNum);
                    }
                    currNum = '';
                }

                if (numList.length === 2) {
                    evaluate();
                    displayStyle(numList[0]);
                }
                currOp = btnID;
            }
            break;
        case ('sqrt') :
            if (start) {
                mOnce = false;
                if (currNum === '') {
                    numList[0] = sqrt(parseFloat(numList[0]));
                    displayStyle(numList[0]);
                }
                else {
                    currNum = sqrt(parseFloat(currNum));
                    displayStyle(currNum);
                }
            }
            break;
        case ('percent') :
            if (start) {
                mOnce = false;
                constantNum = '';
                constantOp = '';

                if (currNum === '' && currOp === '') {
                    numList[0] = percent(parseFloat(numList[0]));
                }
                else if (currNum === '') {
                    numList.push(numList[0]);
                    evaluate();
                    numList[0] = percent(parseFloat(numList[0]));
                }
                else {
                    if (currOp === 'add' || currOp === 'subtract') {
                        numList.push(multiply(numList[0], percent(parseFloat(currNum))));
                    }
                    else {
                        numList.push(percent(parseFloat(currNum)));
                    }
                    currNum = '';
                }

                if (numList.length === 2) {
                    evaluate();
                }

                displayStyle(numList[0]);
            }
            break;
        case ('enter') :
            if (start) {
                mOnce = false;
                if (currNum !== '' && constantNum !== '') {
                    console.log(constantNum);
                    console.log('enter here');
                    numList[0] = currNum;
                    numList.push(constantNum);
                    currOp = constantOp;
                    evaluate();
                }
                else if (currOp === '') {
                    console.log(constantNum);
                    console.log('enter here 2');
                    numList.push(currNum);
                }
                else if (currNum === '' && constantNum !== '') {
                    numList.push(constantNum);
                    currOp = constantOp;
                    evaluate();
                }
                else if (currNum === '') {
                    console.log('enter here 4');
                    numList.push(numList[0]);
                    evaluate();
                }
                else {  
                    numList.push(currNum);
                    evaluate();
                }

                if (constantNum === '' && currOp !== '') {
                    console.log('constantNum');
                    (currOp === 'multiply')? constantNum = numList[0] : constantNum = currNum;
                    constantOp = currOp;
                }

                currNum = '';
                currOp = '';
                displayStyle(numList[0]);
            }
            break;
        case ('mrc') :
            if (start) {
                if (!mOnce) {
                    displayStyle(memory);
                    mSign.style.color = 'black';
                    currNum = String(memory);
                    mOnce = true;
                }
                else {
                    memory = 0;
                    mSign.style.color = ogColor;
                    mOnce = false;
                }
            }
            break;
        case ('mMinus') :
            if (start) {
                mOnce = false;
                if (currNum === '' && currOp !== '') {
                    numList.push(numList[0]);
                    evaluate();
                    tempNum = numList[0];
                }
                else if (numList.length === 0) {
                    tempNum = currNum;
                    currNum = '';
                }
                else if (currNum !== '') {
                    numList.push(currNum);
                    currNum = '';
                    evaluate();
                    tempNum = numList[0];
                }
                else {
                    tempNum = numList[0]
                }
                mSign.style.color = 'black';
                displayStyle(tempNum); 
                memory = memory - tempNum; 
            }
            break;
        case ('mAdd') :
            if (start) {
                mOnce = false;
                if (currNum === '' && currOp !== '') {
                    numList.push(numList[0]);
                    evaluate();
                    tempNum = numList[0];
                }
                else if (numList.length === 0) {
                    tempNum = currNum;
                    currNum = '';
                }
                else if (currNum !== '') {
                    numList.push(currNum);
                    currNum = '';
                    evaluate();
                    tempNum = numList[0];
                }
                else {
                    tempNum = numList[0]
                }
                mSign.style.color = 'black';
                displayStyle(tempNum); 
                memory = memory + tempNum; 
            }
            break;
    }
}

function reset() {
    currNum = '';
    numList = [];
    currOp = '';
    constantOp = '';
    constantNum = '';
    negSign.style.color = ogColor;
    eSign.style.color = ogColor;
}

function displayDot(num) {
    (String(num).includes('.')) ? dot.style.display = 'none' : dot.style.display = 'inline';
}

function displayNeg(num) {
    (String(num)[0] === '-') ? negSign.style.color = 'Black' : negSign.style.color = ogColor;
}

function displayE(num) {
    let splitNum = String(num).replace(/[-]/g,"").split('.');
    console.log(splitNum);
    if (String(num).replace(/[-.]/g,"").length > 8) {
        (splitNum[0].length > 8) ? eSign.style.color = 'Black' : eSign.style.color = ogColor;
    }
    if (String(num)[0] === '-') {
        num = String(num).replace('-','');
    }
    (String(num).includes('.')) ? display.textContent = String(num).slice(0,9) : display.textContent = String(num).slice(0,8);
}

function displayStyle(num) {
    displayDot(num);
    displayNeg(num);
    displayE(num);
}

function evaluate() {
    let result = 0;
    numList = numList.reverse();
    console.log('here');
    console.log(numList);
    num1 = parseFloat(numList.pop());
    num2 = parseFloat(numList.pop());
    
    switch(currOp) {
        case 'divide' :
            result = divide(num1, num2);
            numList.push(result);
            break;
        case 'multiply' :
            result = multiply(num1, num2);
            numList.push(result);
            break;
        case 'subtract' :
            result = subtract(num1, num2);
            numList.push(result);
            break;
        case 'add' :
            result = add(num1, num2);
            numList.push(result);
            break;   
    }
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function add(num1, num2) {
    return num1 + num2;
}

function percent(num) {
    return num/100;
}

function sqrt(num) {
    return Math.sqrt(num);
}