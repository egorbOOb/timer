'use strict';
const switchPicture = () => {
    let defaultSrc;
    
    const getOldImg = function(e) {
        let target = e.target;
        
        if (target.matches('.command__photo')) {
            target.src = defaultSrc;
        }
    };
    
    const getNewImg = function(e) {
        let target = e.target;

        if (target.matches('.command__photo')) {
            defaultSrc = target.src;
            target.src = target.dataset.img;
        }
    };

    const switchImg = function() {
        const row = document.querySelector('.command .row');

        row.addEventListener('mouseover', getNewImg);
        row.addEventListener('mouseout', getOldImg);
    };

    switchImg();
};

export default switchPicture;