'use strict';
const sendForm = () => {
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
        document.body.addEventListener('submit', (event) => {
            event.preventDefault();
                        
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
                    statusMessage.textContent = 'Введите данные правильно!';
                    validForm.setAttribute('style', 'border: 1px solid red');
                    return;
                }

                form.append(statusMessage);
                
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

                postData(body)
                    .then((response) => {
                        if(response.status !== 200) {
                            throw new Error('status network isn\'t 200');
                        } 
                        console.log(response);
                        statusMessage.textContent = successMessage;
                    })
                    .catch((err) => {
                        statusMessage.textContent = errorMessage;
                        console.error(err);
                    });
                });
    };

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
    replaceField();
    sendForm();
};

export default sendForm;