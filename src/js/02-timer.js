// 02-timer.js
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startButton.removeAttribute('disabled');
    } else {
      startButton.setAttribute('disabled', 'disabled');
      alert('Please choose a date in the future');
    }
  },
};

flatpickr(datePicker, options);

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

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

function updateTimerDisplay(time) {
  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);
}

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference > 0) {
    const countdownInterval = setInterval(() => {
      const timeRemaining = convertMs(selectedDate - new Date());
      updateTimerDisplay(timeRemaining);

      if (
        timeRemaining.days === 0 &&
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0
      ) {
        clearInterval(countdownInterval);
        startButton.setAttribute('disabled', 'disabled');
        alert('Countdown completed!');
      }
    }, 1000);
  }
});
