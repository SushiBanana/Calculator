const calculatorDisplay = document.querySelector(".calculator-display")
const buttonsContainer = document.querySelector(".buttons-container")
const backspaceButton = document.querySelector(".backspace-button")
const divideButton = document.querySelector(".divide-button")
const timesButton = document.querySelector(".times-button")
const minusButton = document.querySelector(".minus-button")
const plusButton = document.querySelector(".plus-button")

function createGlobalEventListener(type, selector, callback) {
    buttonsContainer.addEventListener(type, e => {
        if(e.target.matches(selector)) callback(e)
    })
}

createGlobalEventListener("click", ".number", e => {
    let numberValue = e.target.textContent
    let displayer = document.createElement("div")
    displayer.textContent = numberValue
    calculatorDisplay.appendChild(displayer)

})
backspaceButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)
    }
})

backspaceButton.addEventListener("click", e => {
    if (e.target.matches("button") || e.target.matches(".fas")) {
        calculatorDisplay.removeChild(calculatorDisplay.lastChild)
    }
})