'use strict';
function countTimer(deadLine) {
        
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

function getTimeRemaining () {
    let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600 % 24);
    return {
        timeRemaining, hours, minutes, seconds,
    }; 
}

let timer = getTimeRemaining();
let interval;

function updateClock() {
    let timer = getTimeRemaining();

        if (String(timer.hours).length === 1) {
            timerHours.textContent = `0${timer.hours}`;
        } else {
            timerHours.textContent = timer.hours;
        }
        
        if (String(timer.minutes).length === 1) {
            timerMinutes.textContent = `0${timer.minutes}`;
        } else {
            timerMinutes.textContent = timer.minutes;
        }

        if (String(timer.seconds).length === 1) {
            timerSeconds.textContent = `0${timer.seconds}`;
        } else {
            timerSeconds.textContent = timer.seconds;
        }

    if (!(timer.timeRemaining > 0)) {
        clearInterval(interval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
    }

}


if(timer.timeRemaining > 0) {
    interval = setInterval(updateClock, 1000);
} else if(!(timer.timerRemaining > 0)) {
    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
}
}

export default countTimer;