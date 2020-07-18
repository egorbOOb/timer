'use strict';
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

export default toggleMenu;