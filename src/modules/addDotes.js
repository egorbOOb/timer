'use strict';
const addDotes = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
    portfolioDots = document.querySelector('.portfolio-dots');

    slide.forEach((elem, index) => {
        const dot = document.createElement('li');

        dot.classList.add('dot');

        portfolioDots.prepend(dot);
    });


};

export default addDotes;