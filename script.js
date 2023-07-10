const calculatorDisplay = document.querySelector(".calculator-display")
const buttonsContainer = document.querySelector(".buttons-container")
const backspaceButton = document.querySelector(".backspace-button")
const divideButton = document.querySelector(".divide-button")
const timesButton = document.querySelector(".times-button")
const minusButton = document.querySelector(".minus-button")
const plusButton = document.querySelector(".plus-button")
const acButton = document.querySelector(".AC")
const equalsButton = document.querySelector(".equals-button")
const equations = document.querySelector(".equations")
const plusMinus = document.querySelector(".plus-minus")
const percentageButton = document.querySelector(".percentage-button")

let opr = "";
let lastOpr = "";
let finalAnswer = 0;
let storage = "";

function createGlobalEventListener(type, selector, callback) {
    buttonsContainer.addEventListener(type, e => {
        if(e.target.matches(selector)) {callback(e)}
    })
}

createGlobalEventListener("click", ".number", e => {
    let numberValue = e.target.textContent;
    let displayer = document.createElement("div");
    displayer.textContent = numberValue;
    calculatorDisplay.appendChild(displayer);
    updateLastOpr();
})

percentageButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div")
        displayer.textContent = "."
        calculatorDisplay.insertBefore(displayer, calculatorDisplay.childNodes[calculatorDisplay.childNodes.length - 2])
    }
        
})

backspaceButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)
        removeLastDisplay();
    }
})

acButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        clearAllDisplay();
        reset();
    }
})

divideButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "÷";
        calculatorDisplay.appendChild(displayer);
    }
})

timesButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "×";
        calculatorDisplay.appendChild(displayer);
    }
})

minusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "–";
        calculatorDisplay.appendChild(displayer);
    }
})

plusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "+";
        calculatorDisplay.appendChild(displayer);
    }
})

function clearAllDisplay() {
    while (calculatorDisplay.firstChild) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild);
    }
    while (equations.firstChild) {
        equations.removeChild(equations.lastChild)
    }
    
}

function appendEquation() {
    let contentEquation = document.createElement("div");
    contentEquation.textContent = storage;
    equations.appendChild(contentEquation);
}

function appendAnswer() {
    let newContent = document.createElement("div");
    newContent.textContent = finalAnswer;
    calculatorDisplay.appendChild(newContent);
}
equalsButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        if (opr == "") {
            operate();
            storeEquation();
            clearAllDisplay();
            appendEquation();
            roundAnswer(finalAnswer);
            appendAnswer();

        } else if (opr === lastOpr) {
            a = calculatorDisplay.textContent
            getAnswer();
            storage = `${a}${opr}${b}`
            clearAllDisplay();
            appendEquation();
            roundAnswer(finalAnswer);
            appendAnswer();

        } else {
            operate();
            storeEquation();
            clearAllDisplay();
            appendEquation();
            roundAnswer(finalAnswer);
            appendAnswer();
        }
    }
})

function storeEquation() {
    storage = calculatorDisplay.textContent;
}

function operate() {
    getIndexOf("÷");
    getIndexOf("×");
    getIndexOf("–");
    getIndexOf("+");
    getAnswer();   

}

function getIndexOf(operator) {
    if (calculatorDisplay.textContent.includes(operator)) {
        index = calculatorDisplay.textContent.indexOf(operator)
        a = calculatorDisplay.textContent.substring(0, index)
        opr = operator
        lastOpr = operator;
        b = calculatorDisplay.textContent.substring(index + 1, calculatorDisplay.length)
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

        case "–":
            finalAnswer = minus(a,b);
            break;

        case "+":
            finalAnswer = plus(a,b);
            break;
    }
}

function roundAnswer(number) {
    return finalAnswer = +number.toFixed(7);
}

function reset() {
    opr = "";
    lastOpr = "";
    finalAnswer = "";
    storage = "";
}

function updateLastOpr() {
    if (opr !== "")
    return lastOpr = 1;
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

