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
const percentageButton = document.querySelector(".percentage-button")
const dot = document.querySelector(".dot")

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

createGlobalEventListener("click", ".dot", e => {
    let numberValue = e.target.textContent;
    let displayer = document.createElement("div");
    displayer.textContent = numberValue;
    calculatorDisplay.appendChild(displayer);
    updateLastOpr();
    disablePercentageDot()
})

percentageButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        if (calculatorDisplay.childNodes.length == 1 && calculatorDisplay.textContent !== ".") {
            let displayer = document.createElement("div")
            displayer.textContent = "0.0"
            calculatorDisplay.insertBefore(displayer, calculatorDisplay.childNodes[0])
            disablePercentageDot();
        } else if (calculatorDisplay.childNodes.length == 2 && calculatorDisplay.textContent !== ".") {
            let displayer = document.createElement("div")
            displayer.textContent = "0."
            calculatorDisplay.insertBefore(displayer, calculatorDisplay.childNodes[0])
            disablePercentageDot();
        } else if (calculatorDisplay.childNodes.length >= 3 && calculatorDisplay.textContent !== ".") {
            let displayer = document.createElement("div")
            displayer.textContent = "."
            calculatorDisplay.insertBefore(displayer, calculatorDisplay.childNodes[calculatorDisplay.childNodes.length - 2])
            disablePercentageDot();
        }
    }
        
})

backspaceButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)
    }
})

acButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        clearAllDisplay();
        reset();
        enableOperators();
    }
})

divideButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "÷";
        calculatorDisplay.appendChild(displayer);
        disableOperator();
    }
})

timesButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "×";
        calculatorDisplay.appendChild(displayer);
        disableOperator();
    }
})

minusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "–";
        calculatorDisplay.appendChild(displayer);
        disableOperator();

    }
})

plusButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        let displayer = document.createElement("div");
        displayer.textContent = "+";
        calculatorDisplay.appendChild(displayer);
        disableOperator();
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
    let string = finalAnswer.toString()
    let array = string.split("")
    array.forEach(e => {
        let newContent = document.createElement("div");
        newContent.textContent = e;
        calculatorDisplay.appendChild(newContent);
    })
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
            enableOperators()

        } else if (opr === lastOpr) {
            a = calculatorDisplay.textContent
            getAnswer();
            storage = `${a}${opr}${b}`
            clearAllDisplay();
            appendEquation();
            roundAnswer(finalAnswer);
            appendAnswer();
            enableOperators()

        } else {
            operate();
            storeEquation();
            clearAllDisplay();
            appendEquation();
            roundAnswer(finalAnswer);
            appendAnswer();
            enableOperators()
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
    finalAnswer = 0;
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

document.addEventListener("keydown", e => {
    if (e.key >= 0 || e.key == ".") {
        let numberValue = e.key;
        let displayer = document.createElement("div");
        displayer.textContent = numberValue;
        calculatorDisplay.appendChild(displayer);
        updateLastOpr();

    } else if (e.key == "Backspace") {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)

    } else if (e.key == "/") {
        let displayer = document.createElement("div");
        displayer.textContent = "÷";
        calculatorDisplay.appendChild(displayer);

    } else if (e.key == "*") {
        let displayer = document.createElement("div");
        displayer.textContent = "×";
        calculatorDisplay.appendChild(displayer);

    } else if (e.key == "-") {
        e.target.disabled = true
        let displayer = document.createElement("div");
        displayer.textContent = "–";
        calculatorDisplay.appendChild(displayer);

    } else if (e.key == "+") {
        let displayer = document.createElement("div");
        displayer.textContent = "+";
        calculatorDisplay.appendChild(displayer);

    } else if (e.key == "Enter") {
            if (opr == "") {
                operate();
                storeEquation();
                clearAllDisplay();
                appendEquation();
                roundAnswer(finalAnswer);
                appendAnswer();
                enableOperators()
    
            } else if (opr === lastOpr) {
                a = calculatorDisplay.textContent
                getAnswer();
                storage = `${a}${opr}${b}`
                clearAllDisplay();
                appendEquation();
                roundAnswer(finalAnswer);
                appendAnswer();
                enableOperators()
    
            } else {
                operate();
                storeEquation();
                clearAllDisplay();
                appendEquation();
                roundAnswer(finalAnswer);
                appendAnswer();
                enableOperators()
            }
        

    } else if (e.key == "%") {
        let displayer = document.createElement("div")
        displayer.textContent = "."
        calculatorDisplay.insertBefore(displayer, calculatorDisplay.childNodes[calculatorDisplay.childNodes.length - 2])
    }
})

function disableOperator() {
    if (calculatorDisplay.textContent.includes("÷") || 
        calculatorDisplay.textContent.includes("×") ||
        calculatorDisplay.textContent.includes("–") ||
        calculatorDisplay.textContent.includes("+")) {
            divideButton.disabled = true;
            timesButton.disabled = true;
            minusButton.disabled = true;
            plusButton.disabled = true;

        }
}

function enableOperators() {
    divideButton.disabled = false;
    timesButton.disabled = false;
    minusButton.disabled = false;
    plusButton.disabled = false;
    percentageButton.disabled = false;
    dot.disabled = false;
}

function disablePercentageDot() {
    if (calculatorDisplay.textContent.includes(".")) {
        percentageButton.disabled = true;
        dot.disabled = true;
    }
}

