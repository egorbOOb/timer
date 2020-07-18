'use strict';
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

export default validCalc;