window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    
    //Timer
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

    function updateClock() {
        let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;


        if (!(timer.timeRemaining > 0)) {
            clearInterval(interval);
        }
    
    }

    let interval = setInterval(updateClock, 1000);
}

    countTimer('4 july 2020');
});