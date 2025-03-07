import { loginButtonHandler } from '../handlers/buttonHandler';
import { handleSubmit } from '../handlers/submitHandler';
import { goToPage } from '../../../shared/router';
import { createInput } from '../../../shared/components/input/input';
import loginTemplate from '../../../shared/components/authPage/authPageTemplate.hbs';
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
    form.addEventListener('change', loginButtonHandler);

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage('signup');
    });

    return page;
};
