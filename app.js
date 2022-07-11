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
numbers.forEach(number => number.addEventListener('click', _ => handleNumbers(number)));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', _ => handleOperator(operator)));

const equal = document.getElementById('=');
equal.addEventListener('click', _ => handleEquals());

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

function handleNumbers(element) {
    if (answer) {
        answer = '';
    }
    if (!op) {
        if (!a) {a = element.id;}
        else {a += element.id;}
    }
    else {
        if (!b) {b = element.id;}
        else {b += element.id;}
    }
    updateOutput();
}

function handleOperator(element) {
    if (answer) {
        a = answer;
        answer = '';
    }
    if (!a) return;
    if (b) {
        handleEquals();
        a = answer;
        answer = '';
    }
    switch (element.id) {
        case "+": op = add; break;
        case "-": op = subtract; break;
        case "*": op = multiply; break;
        case "/": op = divide;
    }
    updateOutput();
}

function handleEquals() {
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
        case divide: opText = ' / ';
    }
    return opText;
}

window.addEventListener('keydown', function (e) {
    const button = document.getElementById(e.key);
    if (!button) return;
    if (button.classList.contains('number')) {
        handleNumbers(button);
    }
    else if (button.classList.contains('operator')) {
        handleOperator(button);
    }
    else if (button.id === '=') {
        handleEquals();
    }
});
