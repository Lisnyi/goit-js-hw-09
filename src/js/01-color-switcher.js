const startButtonRef = document.querySelector('button[data-start]')
const stopButtonRef = document.querySelector('button[data-stop]')
const page = document.querySelector("body")

let intervalId = null

startButtonRef.addEventListener("click", onStartButtonClick)
stopButtonRef.addEventListener("click", onStopButtonClick)

function onStartButtonClick () {
    intervalId = setInterval(() => {
        page.style.backgroundColor = `${getRandomHexColor()}`
    }, 1000);
    startButtonRef.setAttribute("disabled", "true")
}

function onStopButtonClick () {
    clearInterval(intervalId)
    startButtonRef.removeAttribute("disabled")
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }