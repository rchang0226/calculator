function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    return op(a, b);
}

let a = null;
let op = null;
let b = null;

const buttons = document.querySelectorAll('.number');
buttons.forEach(button => button.addEventListener('click', handleNumbers));
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', handleOperator));
const equal = document.getElementById('equals');
equal.addEventListener('click', handleEquals);

function handleNumbers(e) {
    if (!op) {
        if (!a) {a = this.id;}
        else {a += this.id;}
        console.log(a);
    }
    else {
        if (!b) {b = this.id;}
        else {b += this.id;}
        console.log(b);
    }
}

function handleOperator(e) {
    if (!a) return;
    if (b) operate(a, op, b);
    switch (this.id) {
        case "plus": op = add; break;
        case "minus": op = subtract; break;
        case "multiply": op = multiply; break;
        case "divide": op = divide;
    }
    console.log(op);
}

function handleEquals(e) {
    if (a && op && b) {
        a = String(operate(Number(a), op, Number(b)));
        op = null;
        b = null;
        console.log(a);
    }
}
