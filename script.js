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
        const body = document.body,
            menu = document.querySelector('menu');

        console.log(body);
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        
        body.addEventListener('click', (event) => {
            let target = event.target;

            if (target.matches('menu a')) {
                handlerMenu();
                return;
            } else if (target.matches('a.close-btn')) {
                handlerMenu();
                return;
            } else if(target.closest('div.menu')) {
                handlerMenu();
            } else if (!target.closest('menu.active-menu') && menu.classList.contains('active-menu')) {
                handlerMenu();
            }
        });
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
    const service = document.querySelector('.service'),
        portfolio = document.querySelector('.portfolio'),
        calc = document.querySelector('.calc'),
        companies = document.querySelector('.companies'),
        command = document.querySelector('.command'),
        connect = document.querySelector('.connect');

        console.dir(service);

    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li>a');  

    let elemPosition;
    let del;

    function doScroll() {
        let scrollCount = document.documentElement.scrollTop;
        scrollCount += 15;
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
        elemPosition = elem.offsetTop;
        doScroll();
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

    // Slider 

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
            
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval); 
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = slide.length - 1; 
                }
            } else if (target.matches('.dot')) {
                dot.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event ) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(3000);
    };

    //addDotes

    const addDots = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots');

        slide.forEach((elem, index) => {
            const dot = document.createElement('li');

            dot.classList.add('dot');

            portfolioDots.prepend(dot);
        });


    };

    addDots();
    slider();
    tabs();
    togglePopUp();
    toggleMenu();
    countTimer('9 july 2020');
});