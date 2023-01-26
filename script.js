function add(num1, num2) {
    return num2 ? num1 + num2 : num1 + num1;
}

function subtract(num1, num2) {
    return num2 ? num1 - num2 : num1 - num1;
}
function multiply(num1, num2) {
    return num2 ? num1 * num2 : num1 * num1;
}

function divison(num1, num2) {
    return num2 ? num1 / num2 : num1 / num1;
}

function percent(num) {
    return num/100;
}

function sqrt(num) {
    return Math.sqrt(num);
}

function operate(operand, num1, num2) {
    switch (operand) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '%':
            percent(num1);
            break;
        case 'sqrt':
            sqrt(num1);
            break;
    }
}