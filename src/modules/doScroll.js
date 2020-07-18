'use strict';
const doScroll = () => {
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
};

export default doScroll;