const calculatorDisplay = document.querySelector(".calculator-display")
const buttonsContainer = document.querySelector(".buttons-container")
const backspaceButton = document.querySelector(".backspace-button")
const divideButton = document.querySelector(".divide-button")
const timesButton = document.querySelector(".times-button")
const minusButton = document.querySelector(".minus-button")
const plusButton = document.querySelector(".plus-button")
const acButton = document.querySelector(".AC")
const equalsButton = document.querySelector(".equals-button")

let displayEquation = "";

function createGlobalEventListener(type, selector, callback) {
    buttonsContainer.addEventListener(type, e => {
        if(e.target.matches(selector)) {callback(e)}
    })
}

createGlobalEventListener("click", ".number", e => {
    let numberValue = e.target.textContent
    let displayer = document.createElement("div")
    displayer.textContent = numberValue
    calculatorDisplay.appendChild(displayer)
    displayEquation += numberValue
})

backspaceButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)
        removeLastDisplay();
    }
})

acButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        while (calculatorDisplay.firstChild) {
            calculatorDisplay.removeChild(calculatorDisplay.lastChild)
        }
        displayEquation = "";
    }
})

divideButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div")
        displayer.textContent = "÷"
        calculatorDisplay.appendChild(displayer)
        displayEquation += "÷"
    }
})

timesButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div")
        displayer.textContent = "×"
        calculatorDisplay.appendChild(displayer)
        displayEquation += "×"
    }
})

minusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div")
        displayer.textContent = "-"
        calculatorDisplay.appendChild(displayer)
        displayEquation += "-"
    }
})

plusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div")
        displayer.textContent = "+"
        calculatorDisplay.appendChild(displayer)
        displayEquation += "+"
    }
})

equalsButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        operate();
    }
})

function removeLastDisplay() {
    displayEquation = displayEquation.substring(0, displayEquation.length - 1);
}

let a = "";
let b = "";
let opr = "";
let index = "";
let finalAnswer = "";

function operate() {
    getIndexOf("÷");
    getIndexOf("×");
    getIndexOf("-");
    getIndexOf("+");
    getAnswer();
}

function getIndexOf(operator) {
    if (displayEquation.includes(operator)) {
        index = displayEquation.indexOf(operator)
        a = displayEquation.substring(0, index)
        opr = operator
        b = displayEquation.substring(index + 1, displayEquation.length)
    }
}

function getAnswer() {
    switch (opr) {
        case "÷":
            finalAnswer = divide(a,b);
            break;

        case "×":
            finalAnswer = times(a,b);
            break;

        case "-":
            finalAnswer = minus(a,b);
            break;

        case "+":
            finalAnswer = plus(a,b);
            break;
    }
}

function divide(a,b) {
    return a / b;
}

function times(a,b) {
    return a * b;
}

function minus(a,b) {
    return a - b;
}

function plus(a,b) {
    return +a + +b;
}