import { goToPage } from '../../../shared/router';
import {createInput} from '../../../shared/components/input/input';
import { userValidation } from '../../../features/authorization/lib/userValidation';
import { validatePassword } from '../../../shared/validation/passwordValidation';
import { validateEmail } from '../../../shared/validation/emailValidation';
import loginTemplate from '../../../shared/components/authPage/authPage.hbs';
import '../../../shared/components/input/input.css';
import '../../../shared/components/authPage/authPage.css';
import './login.css';

/**
 * Генерирует страницу логина
 * @returns {HTMLDivElement}
 */
export const renderLogin = () => {
    const page = document.createElement('div');

    const config = {
        inputs: [
            {type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
            {type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Неправильный пароль или почта', isPassword: true}
        ],
        page: 'login',
        redirectText: 'Еще нет аккаунта?',
        redirectBtn: 'Регистрация',
        submitBtn: 'Вход',
        header: 'Вход',
        subheader: 'Добро пожаловать в flow!'
    };

    const html = loginTemplate(config);
    page.insertAdjacentHTML('beforeend', html);

    const form = page.querySelector('.login-form');
    const placeholders = form.querySelectorAll('.input-placeholder');
    placeholders.forEach((item, index) => {
        item.replaceWith(createInput(config.inputs[index]));
    });

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('change', buttonHandler);

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage('signup');
    });

    return page;
};


const handleSubmit = async (event) => {
    const inputData = {};
    const inputs = event.target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    try {
        const valid = await userValidation(inputData);
        switch (valid) {
        case '200':
            goToPage('feed');
            break;
        case '403':
            alert('Неправильный пароль');
            break;
        case '404':
            alert('Такого пользователя не существует');
            break;
        }
    } catch (error) {
    }
};

const buttonHandler = () => {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    const valid = (validatePassword(password)[0] && validateEmail(email)[0]);

    const button = document.querySelector('.button');
    if (valid) {
        button.style.opacity = '100%';
    } else {
        button.style.opacity = '25%';
    }
};

