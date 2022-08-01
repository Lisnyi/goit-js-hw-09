import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  });

const delayInput = document.querySelector("input[name=delay]")
const stepInput = document.querySelector("input[name=step]")
const amountInput = document.querySelector("input[name=amount]")
const form = document.querySelector(".form")

let firstDelay = 0
let delayStep = 0
let amount = 0

form.addEventListener("submit", submitForm)
delayInput.addEventListener("change", setDelay)
stepInput.addEventListener("change", setStep)
amountInput.addEventListener("change", setAmount)

function setDelay (e) {
  firstDelay = Number(e.currentTarget.value)
}

function setStep (e) {
  delayStep = Number(e.currentTarget.value)
}

function setAmount (e) {
  amount = Number(e.currentTarget.value)
}

function submitForm (e) {
  e.preventDefault()

  for (let i = 1; i <= amount; i += 1) {
    createPromise (i, (firstDelay + delayStep*(i-1)))
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    });
  } 
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      if (shouldResolve) {
        resolve ({position, delay})
      } else {
        reject ({position, delay})
      }
    }, delay)
  })
}