
import Notiflix from 'notiflix';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('submit', handleSubmit);

async function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const initialDelay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  let currentDelay = initialDelay;

  const createPromises = async () => {
    for (let i = 1; i <= amount; i++) {
      try {
        const result = await createPromise(i, currentDelay);
        Notiflix.Notify.Success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      } catch (error) {
        Notiflix.Notify.Failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      }
      currentDelay += step;
    }
  };

  await createPromises();

  form.reset();
}
