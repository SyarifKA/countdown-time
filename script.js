let countdown;
let running = false;
let remainingTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const beep = document.getElementById('beep');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closeBtn');

function startCountdown() {
    if (!running) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

        if (remainingTime > 0) {
            countdown = setInterval(updateTime, 1000);
            startStopBtn.textContent = 'Stop';
            running = true;
            disableInputs();
        }
    } else {
        clearInterval(countdown);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function resetCountdown() {
    clearInterval(countdown);
    display.textContent = '00:00:00';
    display.style.color = '#333';
    startStopBtn.textContent = 'Start';
    running = false;
    enableInputs();
    closePopup();
}

function updateTime() {
    remainingTime -= 1000;

    if (remainingTime <= 0) {
        clearInterval(countdown);
        display.textContent = '00:00:00';
        display.style.color = '#333';
        startStopBtn.textContent = 'Start';
        running = false;
        enableInputs();
        beep.play();
        showPopup();
    } else {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        if (remainingTime <= 10000) {
            display.style.color = 'red';
            beep.play();
        } else {
            display.style.color = '#333';
        }

        display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function disableInputs() {
    document.getElementById('hours').disabled = true;
    document.getElementById('minutes').disabled = true;
    document.getElementById('seconds').disabled = true;
}

function enableInputs() {
    document.getElementById('hours').disabled = false;
    document.getElementById('minutes').disabled = false;
    document.getElementById('seconds').disabled = false;
}

function showPopup() {
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
}

startStopBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountdown);
closeBtn.addEventListener('click', closePopup);
