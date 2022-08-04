import flatpickr from "flatpickr"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css"


const dateTimePicker = document.querySelector("#datetime-picker")
const startButtonRef = document.querySelector("button[data-start]")
const timerDays = document.querySelector("span[data-days]")
const timerHours = document.querySelector("span[data-hours]")
const timerMinutes = document.querySelector("span[data-minutes]")
const timerSeconds = document.querySelector("span[data-seconds]")

let timeNow = null
let pickedDate = null
let intervalId = null

startButtonRef.setAttribute('disabled', 'true')

Notify.init({
    clickToClose: true,
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDate) {
        timeNow = new Date()
        pickedDate = selectedDate[0].getTime()
      if (pickedDate >= timeNow.getTime()) {
        startButtonRef.removeAttribute('disabled')
        startButtonRef.addEventListener('click', onStartButtonClick)
        return
      }
      startButtonRef.removeEventListener('click', onStartButtonClick)
      startButtonRef.setAttribute('disabled', 'true')
      Notify.failure('Please choose a date in the future');
    },
  };

flatpickr(dateTimePicker, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function onStartButtonClick () {
    timer()
    intervalId = setInterval (timer, 1000)
} 

function timer () {
    timeNow = new Date()
    const deltaTime = pickedDate - timeNow.getTime()
    if (deltaTime > 0) {        
    timerDays.textContent = addLeadingZero(convertMs(deltaTime).days)
    timerHours.textContent = addLeadingZero(convertMs(deltaTime).hours)
    timerMinutes.textContent = addLeadingZero(convertMs(deltaTime).minutes)
    timerSeconds.textContent = addLeadingZero(convertMs(deltaTime).seconds)
    } else {
        stopTimer()
    }
}

function addLeadingZero(value) {
    if (value < 10) {
        return String(value).padStart(2, '0')
    }
    return value
}

function stopTimer () {
    clearInterval (intervalId)        
    startButtonRef.setAttribute('disabled', 'true')
    intervalId = null
}