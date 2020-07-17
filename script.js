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
            setTimeout(() => requestAnimationFrame(popupAnimate), 1000 / 200);
        
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


                if(!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    // Scroll
    const service = document.querySelector('.service'),
        portfolio = document.querySelector('.portfolio'),
        calcBlock = document.querySelector('.calc'),
        companies = document.querySelector('.companies'),
        command = document.querySelector('.command'),
        connect = document.querySelector('.connect');


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
        getScrollPosition(calcBlock);
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
    };
    
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

    //switchPicture
    let defaultSrc;
    
    const getOldImg = function(e) {
        let target = e.target;
        
        if (target.matches('.command__photo')) {
            console.log(target.getAttribute('src'));
            target.src = defaultSrc;
            console.log(target.src);
        }
    };
    
    const getNewImg = function(e) {
        let target = e.target;

        if (target.matches('.command__photo')) {
            defaultSrc = target.src;
            target.src = target.dataset.img;
            console.log(target.src);
        }
    };

    const switchImg = function() {
        const row = document.querySelector('.command .row');

        row.addEventListener('mouseover', getNewImg);
        row.addEventListener('mouseout', getOldImg);
    };

    //doValid
    const validCalc = function() {
        const calcBlock = document.querySelector('.calc-block');

        const getValidValue = (e) => {
            let target = e.target;

            if(target.matches('.calc-block>input')) {
                target.value = target.value.replace(/\D/, '');
            }
        };

        calcBlock.addEventListener('input', getValidValue);

    };

    // Calc

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            
            if (typeValue && squareValue ) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            let target = event.target;

            if (target === calcType || target === calcSquare ||
                target === calcDay || target === calcCount) {
                    countSum();
                }
        });
        };

        //send-ajax-form
        const getValidForm = (form) => {
            let validator = /^(\+7|8)(\d){10}$/;
            return validator.test(form);
        };

        const replaceField = () => {
            const messageField = document.querySelector('#form2-message');
            console.log(messageField);
            messageField.addEventListener('input', () => {
                messageField.value = messageField.value.replace(/[^а-яА-Я ]/, '');
            });
        };
        
        const errorMessage = 'что-то пошло не так',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        
        let form;
        
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white';

        const sendForm = () => {
            
            return new Promise ((resolve, reject) => {
                            
                    statusMessage.textContent = loadMessage;

                    event.preventDefault();
                    let target = event.target;
                    if (target.matches('#form1')) {
                        form = document.getElementById('form1');
                    } else if (target.matches('#form2')) {
                        form = document.getElementById('form2');
                    } else if (target.matches('#form3')) {
                        form = document.getElementById('form3');
                    } else {
                        return;
                    }

                    const validForm = form.querySelector('.form-phone');
                    validForm.removeAttribute('style');

                    if (!getValidForm(validForm.value)) {
                        validForm.setAttribute('style', 'border: 1px solid red');
                        return;
                    }

                    form.append(statusMessage);

                    const request = new XMLHttpRequest();

                    
                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/JSON');
                    
                    const formData = new FormData(form);
                    
                    const InputData = form.querySelectorAll('input');
                    
                    InputData.forEach(item => item.value = '');
                    
                    let body  = {};
                    
                    // for (let val of formData.entries()) {
                        //     body[val[0]] = val[1];
                        // }
                        
                    formData.forEach((val, key) => {
                        body[key] = val;
                    });
                        
                    request.addEventListener('readystatechange', () => {
                        statusMessage.textContent = loadMessage;
    
                        if (request.readyState !== 4) {
                            return;
                        }
    
                        if (request.status === 200) {
                            resolve();
                        } else {
                            reject(request.statusText);
                        } 
                    });
                        request.send(JSON.stringify(body));
            });
        };


    replaceField();

    document.body.addEventListener('submit', (event) => {
        event.preventDefault();

        sendForm()
            .then(() => {
                statusMessage.textContent = successMessage;
            })
            .catch((err) => {
                statusMessage.textContent = errorMessage;
                console.error(err);
            });
    });
    calc();
    validCalc();
    switchImg();
    addDots();
    slider();
    tabs();
    togglePopUp();
    toggleMenu();
    countTimer('9 july 2020');
});