'use strict';
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

export default togglePopUp;