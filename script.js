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

    // Меню

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
    
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
    };

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = popup.querySelector('.popup-content');
        
        let count,
            colorCount;

        function popupAnimate() {
            setTimeout(() => requestAnimationFrame(popupAnimate), 1000 / 28);
        
            count++;
            colorCount += 0.01;
            if (count >= 25) {
                cancelAnimationFrame(popupAnimate);
            } else {
                popupContent.setAttribute('style', `background-color: rgba(36, 36, 31, ${colorCount})`);
                popupContent.style.transform = `translateX(${-count * 1.5}px)`;
            }
        }
        
        popupBtn.forEach((elem) => {

            elem.addEventListener('click', () => {

                if (screen.width <= 768) {
                    popup.style.display = 'block';
                    popupContent.setAttribute('style', `background-color: rgba(36, 36, 31, 1)`);
                    popupClose.setAttribute('style', `background-color: rgba(36, 36, 31, 1)`);
                } else {
                    count = -100;
                    colorCount = 0;
                    popupContent.setAttribute('style', `background-color: rgba(36, 36, 31, 0)`);
                    popupClose.setAttribute('style', `background-color: rgba(36, 36, 31, 0)`);
                    popup.style.display = 'block';
                    popupAnimate();
                }

            }); 

        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (event)=>{
            
            let target = event.target;
            
            if(target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                
                target = target.closest('.popup-content');

                console.log(target);

                if(!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    // Scroll
    const service = document.querySelector('#service-block'),
        portfolio = document.querySelector('#portfolio'),
        calc = document.querySelector('#calc'),
        companies = document.querySelector('#companies'),
        command = document.querySelector('#command'),
        connect = document.querySelector('#connect');

        console.dir(service);

    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li');  

    let elemPosition;
    let del;

    function doScroll() {
        let scrollCount = document.documentElement.scrollTop;
        scrollCount += 15;
        console.log(scrollCount, elemPosition);
        if (scrollCount >= elemPosition) {
            cancelAnimationFrame(del);
        } else {
            window.scrollTo(0, scrollCount);
            setTimeout(function() {
                del = requestAnimationFrame(doScroll);
            }, 1);
        }
    }

    let getScrollPosition = function(elem) {
        setTimeout(() => document.documentElement.scrollTop = 0, 1);
        elemPosition = elem.offsetTop;
        doScroll();
        console.log(elemPosition);
    };

    document.querySelector('img[src="images/scroll.svg"]').addEventListener('click', function() {
        getScrollPosition(service);
    });

    menuItems[0].addEventListener('click', function() {
        console.log(this);
        getScrollPosition(service);
    });

    menuItems[1].addEventListener('click', function() {
        getScrollPosition(portfolio);
    });

    menuItems[2].addEventListener('click', function() {
        getScrollPosition(calc);
    });

    menuItems[3].addEventListener('click', function() {
        getScrollPosition(companies);
    });

    menuItems[4].addEventListener('click', function() {
        getScrollPosition(command);
    });
    
    // Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'), 
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if(index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tabContent[i].classList.add('d-none');
                tab[i].classList.remove('active');    
            }
        }
    }
    
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if(target) {
                tab.forEach((item, i) => {
                    if(item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
    togglePopUp();
    toggleMenu();
    countTimer('9 july 2020');
});