// Global Variables
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
let memory = 0;
const ogColor = 'rgba(49, 53, 49, 0.295)';

main();

function main() {
    const allBtns = document.getElementsByTagName('button');
    const sideDesigns = document.querySelectorAll('.sideDesign');
    const btnDesigns = document.querySelectorAll('.btnDesign');

    // Create grid for side of display
    sideDesigns.forEach((side) => {
        for(let i = 0; i < 80; i++) {
            let div = document.createElement('div');
            div.classList.add('sideBox');
            side.appendChild(div);
        }
    })

    // Create grid for each button
    btnDesigns.forEach((btn) => {
        let currClass = '';
        (btn.parentNode.classList.contains('num') || btn.parentNode.id === 'decimal') ? currClass = 'btnBoxNum' : currClass = 'btnBox';
        for(let i = 0; i < 27; i++) {
            let div = document.createElement('div');
            div.classList.add(currClass);
            btn.appendChild(div);
        }
    })

    // Listen for click for each button
    Array.from(allBtns).forEach(btn => btn.addEventListener('click', () => calculator(btn)));
    // Listen for keyboard press
    document.addEventListener('keydown', (event) => {
        // Prevent errors from other key press
        const keyList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '*', '/', '+', '-', '=', '%', 'm', 'Delete', 'Enter'];
        if (keyList.includes(event.key)){
            calculator(keyToBtn(event));
        }   
    });
}

// Find element associated with key press
function keyToBtn(e) {
    let keyPress = e.key;
    // Two types of enters
    if (keyPress === '=') keyPress = 'Enter';
    return key = document.querySelector(`.key[data-key="${keyPress}"]`);
}

function calculator(btnElement) {
    let btnContent = '';
    const btnID = btnElement.id;
    const btnCategory = (btnElement.classList.length > 1)? btnElement.classList[0] : btnID;

    switch(btnCategory) {
        // onClear
        case ('onClear') :
            // Start Calculator
            start = true;
            mOnce = false;
            display.parentNode.style.color = 'black';
            // Clear once, only current number
            if (!clearOnce) {
                if (currNum === '') {
                    numList = [];
                }
                currNum = '0';
                displayStyle(currNum);
                clearOnce = true;
            }
            // Click twice without interuption, reset
            else {
                reset();
                clearOnce = false;
            }
            break;
        // Numericals
        case ('num') :
            // Start calculator
            start = true;
            clearOnce = false;
            display.parentNode.style.color = 'black';
            // Check length without neg and decimal sign, Check if string
            if (typeof currNum === 'string' && currNum.replace(/[-.]/g, "").length < 8) {
                btnContent = btnElement.firstChild.textContent;
                if (mOnce) {
                    currNum = '';
                    mOnce = false;
                }
                // Prevent ex: '01'
                (currNum === '0')? currNum = btnContent : currNum += btnContent;
                displayStyle(currNum);
            }
            break;
        // Decimal    
        case ('decimal') :
            // Start Calculator
            start = true;
            clearOnce = false;
            display.parentNode.style.color = 'black';
            // Replace current num from memory to decimal
            if (mOnce) {
                currNum = '0.';
                mOnce = false;
            }
            else if (!currNum.includes('.')) {
                // Prevent ex: '.1' vs '0.1'
                if (currNum === '') currNum = '0';
                currNum += '.';
            }
            displayStyle(currNum);
            break;
        // Negative
        case ('neg') :
            if (start) {
                clearOnce = false;
                mOnce = false;

                if (currNum !== '') {
                    // Return to string to allow for additional digits
                    currNum = String(currNum * -1);
                    displayStyle(currNum);
                }
                else {
                    numList[0] = numList[0] * -1;
                    displayStyle(numList);
                }
            }
            break;
        // Basic Operators
        case ('operator') :
            if (start) {
                clearOnce = false;
                mOnce = false;
                constantNum = '';
                constantOp = '';
                
                if (currNum !== '') {
                    // ex: 2 = 2 +  =>  2 +
                    if (currOp === '') {
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
        // Square Root
        case ('sqrt') :
            if (start) {
                clearOnce = false;
                mOnce = false;
                // Sqrt previously solved numbers
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
        // Percent
        case ('percent') :
            if (start) {
                clearOnce = false;
                mOnce = false;
                constantNum = '';
                constantOp = '';
                
                // Percent of previously solved number
                if (currNum === '' && currOp === '') {
                    numList[0] = percent(parseFloat(numList[0]));
                }
                // Solve ex: 1+, percent result
                else if (currNum === '') {
                    numList.push(numList[0]);
                    evaluate();
                    numList[0] = percent(parseFloat(numList[0]));
                }
                else {
                    // ex: 250 + 5% => 250 + (250 * 5%)
                    // Append ex: (250 * 5%)
                    if (currOp === 'add' || currOp === 'subtract') {
                        numList.push(multiply(numList[0], percent(parseFloat(currNum))));
                    }
                    // ex: 250 * 5% => 250 * 0.05
                    // Append percentage
                    else {
                        numList.push(percent(parseFloat(currNum)));
                    }
                    currNum = '';
                }
                
                // Finish evaluation of equation
                if (numList.length === 2) {
                    evaluate();
                }

                currOp = '';
                currNum = '';
                displayStyle(numList[0]);
            }
            break;
        // Enter
        case ('enter') :
            if (start) {  
                let tempNum = numList[0];
                clearOnce = false;
                mOnce = false;
                //ex: 2 = 
                // ex: 2 = 5 = 
                if (constantOp === '' && currOp === '' && currNum !== ''){
                    numList[0] = currNum;
                }
                // ex: 2 + 3 = ?  =>  4 + 3 = ?
                // ex: 2 + 3 = 4 =
                else if (currNum !== '' && constantNum !== '') {
                    numList[0] = currNum;
                    numList.push(constantNum);
                    currOp = constantOp;
                    evaluate();
                }
                // ex: 2 + 3 = ? + 3 = ? + 3 = ?
                // ex: 2 + 3 = = =
                else if (currNum === '' && constantNum !== '') {
                    numList.push(constantNum);
                    currOp = constantOp;
                    evaluate();
                }
                // ex: 2 + 2 = ?
                // ex: 2 + =
                else if (currNum === '' && currOp !== '') {
                    // ex: 20 + 5 / =
                    (currOp === 'divide') ? numList.unshift('1') : numList.push(numList[0]);
                    evaluate();
                }
                // ex: 1 + 2 = ?
                // Not else to allow for 2 = = to display only numList[0]
                else if (currNum !== '' && currOp !== ''){  
                    numList.push(currNum);
                    evaluate();
                }
                
                // Store constants for repeated use
                // Multiply uses first number
                // ex: 3 * 5 = ?  => 3 * 4 = ?
                if (constantNum === '' && currOp !== '') {
                    (currOp === 'multiply')? constantNum = tempNum : constantNum = currNum;
                    constantOp = currOp;
                }

                currNum = '';
                currOp = '';
                displayStyle(numList[0]);
            }
            break;
        // Memory Recall
        case ('mrc') :
            if (start) {
                clearOnce = false;
                // Click once recalls a copy of stored memory 
                if (!mOnce) {
                    displayStyle(memory);
                    mSign.style.color = 'black';
                    currNum = String(memory);
                    mOnce = true;
                }
                // Second consecutive click clears memeory
                else {
                    memory = 0;
                    mSign.style.color = ogColor;
                }
            }
            break;
        // Memory Minus
        case ('mMinus') :
            if (start) {
                clearOnce = false;
                mOnce = false;
                memoryOperator();
                memory = memory - numList[0]; 
            }
            break;
        // Memory Add
        case ('mAdd') :
            if (start) {
                clearOnce = false;
                mOnce = false;
                memoryOperator(); 
                memory = memory + numList[0]; 
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

// Hide dot element if decimal exists
function displayDot(num) {
    (String(num).includes('.')) ? dot.style.display = 'none' : dot.style.display = 'inline';
}

// Indicate negative sign on display if exists
function displayNeg(num) {
    (String(num)[0] === '-') ? negSign.style.color = 'Black' : negSign.style.color = ogColor;
}

function displayE(num) {
    // Array to split number from decimal point
    let splitNum = String(num).replace(/[-]/g,"").split('.');
    // Max length 8 not including decimal and negative sign
    if (String(num).replace(/[-.]/g,"").length > 8) {
        // E sign if whole numbers are more than 8
        (splitNum[0].length > 8) ? eSign.style.color = 'Black' : eSign.style.color = ogColor;
    }
    // Remove negative sign only for display
    if (String(num)[0] === '-') {
        num = String(num).replace('-','');
    }
    // Extra slice for decimal point
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

function memoryOperator() {
    // ex: 2 = + m
    if (currNum === '' && currOp !== '') {
        numList.push(numList[0]);
        evaluate();
    }
    // ex: 2 m
    else if (numList.length === 0) {
        numList.push(currNum);
        currNum = '';
    }
    // ex: 2 + 3 m
    else if (currNum !== '') {
        numList.push(currNum);
        currNum = '';
        evaluate();
    }
    // Ends with else if as last case is numList[0] which is was handled in previous case
    // ex: 2 = m
    currOp = '';
    mSign.style.color = 'black';
    displayStyle(numList[0]); 
}