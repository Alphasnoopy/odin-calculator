function add(num1, num2) {
    return num2 ? num1 + num2 : num1 + num1;
}

function subtract(num1, num2) {
    return num2 ? num1 - num2 : 0;
}
function multiply(num1, num2) {
    return num2 ? num1 * num2 : num1 * num1;
}

function divison(num1, num2) {
    return num2 ? num1 / num2 : 1;
}

function percent(num) {
    return num/100;
}

function sqrt(num) {
    return Math.sqrt(num);
}