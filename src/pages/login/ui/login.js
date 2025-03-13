import {debouncedLoginButton} from '../handlers/loginButtonHandler';
import {handleLogin} from '../handlers/loginHandler';
import {goToPage} from '../../../shared/router';
import {createInput} from '../../../shared/components/input/input';
import loginTemplate from '../../../shared/components/authPage/authPageTemplate.hbs';
import '../../../shared/components/input/input.scss';
import '../../../shared/components/authPage/authPage.scss';
import './login.scss';

/**
 * Генерирует страницу логина и создает обработчики событий
 * @returns {HTMLDivElement}
 */
export const renderLogin = async () => {
    const page = document.createElement('div');

    const config = {
        inputs: [
            {type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
            {type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Неправильный пароль или почта', isPassword: true}
        ],
        page: 'login',
        redirectText: 'Ещё нет аккаунта?',
        redirectBtn: 'Регистрация',
        submitBtn: 'Вход',
        header: 'Вход',
        subheader: 'Добро пожаловать во flow!'
    };

    const html = loginTemplate(config);
    page.insertAdjacentHTML('beforeend', html);

    const form = page.querySelector('.login-form');
    const placeholders = form.querySelectorAll('.input-placeholder');
    placeholders.forEach((item, index) => {
        item.replaceWith(createInput(config.inputs[index]));
    });

    form.addEventListener('submit', handleLogin);
    form.addEventListener('input', debouncedLoginButton);

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click',  async(event) => {
        event.preventDefault();
        await goToPage('signup');
    });

    return page;
};
