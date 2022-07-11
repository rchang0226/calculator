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

let a = '';
let op = '';
let b = '';
let answer = '';

const buttons = document.querySelectorAll('.column div');
buttons.forEach(button => button.addEventListener('mouseover', hover));
buttons.forEach(button => button.addEventListener('mouseout', stopHover));
buttons.forEach(button => button.addEventListener('mousedown', press));
document.body.onmouseup = () => (buttons.forEach(button => button.classList.remove('pressing')));

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', handleNumbers));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', handleOperator));

const equal = document.getElementById('equals');
equal.addEventListener('click', handleEquals);

const clear = document.getElementById('clear');
clear.addEventListener('click', doClear);

function hover(e) {
    this.classList.add('hovering');
}

function stopHover(e) {
    this.classList.remove('hovering');
}

function press(e) {
    this.classList.add('pressing');
}

function handleNumbers(e) {
    if (answer) {
        answer = '';
    }
    if (!op) {
        if (!a) {a = this.id;}
        else {a += this.id;}
    }
    else {
        if (!b) {b = this.id;}
        else {b += this.id;}
    }
    updateOutput();
}

function handleOperator(e) {
    if (answer) {
        a = answer;
        answer = '';
    }
    if (!a) return;
    if (b) {
        handleEquals(e);
        a = answer;
        answer = '';
    }
    switch (this.id) {
        case "plus": op = add; break;
        case "minus": op = subtract; break;
        case "multiply": op = multiply; break;
        case "divide": op = divide;
    }
    updateOutput();
}

function handleEquals(e) {
    if (a && op && b) {
        answer = String(operate(Number(a), op, Number(b)));
        updatePreview();
        a = '';
        op = '';
        b = '';
    }
    updateOutput();
}

function doClear(e) {
    a = '';
    op = '';
    b = '';
    answer = '';
    updateOutput();
}

const output = document.querySelector('.answer');
function updateOutput() {
    opText = selectOpText(op);
    output.textContent = a + opText + b + answer;
}

const preview = document.querySelector('.preview');
function updatePreview() {
    opText = selectOpText(op);
    preview.textContent = a + opText + b + ' = ' + answer;
}

function selectOpText(op) {
    opText = '';
    switch(op) {
        case add: opText = ' + '; break;
        case subtract: opText = ' - '; break;
        case multiply: opText = ' * '; break;
        case divide: opText = ' / '; break;
    }
    return opText;
}
