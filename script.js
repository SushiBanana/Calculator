const zeroButton = document.querySelector(".zero-button")
const calculatorDisplay = document.querySelector(".calculator-display")

zeroButton.addEventListener("click", () => {
    const content = document.createElement('div')
    content.textContent = "0"
    calculatorDisplay.appendChild(content)
})