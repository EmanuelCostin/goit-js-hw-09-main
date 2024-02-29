
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.querySelector('[data-start]');
    const stopBtn = document.querySelector('[data-stop]');
  
    let colorInterval;
  
    startBtn.addEventListener('click', startColorChange);
    stopBtn.addEventListener('click', stopColorChange);
  
    function startColorChange() {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      colorInterval = setInterval(changeBackgroundColor, 1000);
    }
  
    function stopColorChange() {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      clearInterval(colorInterval);
    }
  
    function changeBackgroundColor() {
      document.body.style.backgroundColor = getRandomHexColor();
    }
  });
  