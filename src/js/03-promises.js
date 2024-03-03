function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const initialDelay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  let currentDelay = initialDelay;

  const createAndLogPromise = async position => {
    try {
      console.log(
        'Fulfilled promise ' + position + ' in ' + currentDelay + 'ms'
      );
      await sleep(currentDelay);
    } catch (error) {
      console.log(
        'Rejected promise ' + position + ' in ' + currentDelay + 'ms'
      );
      throw error; // Re-throw the error so it propagates up
    }
  };

  const createPromises = async () => {
    for (let i = 1; i <= amount; i++) {
      try {
        await createAndLogPromise(i);
      } catch (error) {
        // Handle the error if needed
        console.error('Error creating promise:', error);
      }
      currentDelay += step;
    }
  };

  await createPromises(); // Wait for all promises to complete

  form.reset();
}
