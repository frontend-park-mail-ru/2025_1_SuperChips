import { debouncedLoginButton } from '../handlers/loginButtonHandler';
import { handleLogin } from '../handlers/loginHandler';
import { fillPictureBox } from '../lib/fillPictureBox';
import { goToPage } from 'shared/router';
import { Input } from 'shared/components/input';
import loginTemplate from '../authPage/authPageTemplate.hbs';
import '../authPage/authPage.scss';
import './login.scss';

/**
 * Генерирует страницу логина и создает обработчики событий
 * @returns {HTMLDivElement}
 */
export const LoginPage = async () => {
    const page = document.createElement('div');

    const config = {
        inputs: [
            {
                type: 'email',
                id: 'email',
                inputLabel: 'Email',
                errorMessage: 'Неправильный формат почты',
                maxlength: 120,
                autocomplete: 'username',
            },
            {
                type: 'password',
                id: 'password',
                inputLabel: 'Пароль',
                errorMessage: 'Неправильный пароль или почта',
                isPassword: true,
                maxlength: 120,
                autocomplete: 'current-password',
            }
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
        item.replaceWith(Input(config.inputs[index]));
    });

    form.addEventListener('submit', handleLogin);
    form.addEventListener('input', debouncedLoginButton);

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click',  async(event) => {
        event.preventDefault();
        goToPage('/signup', true).finally();
    });

    const observer = new MutationObserver(() => {
        fillPictureBox(1);
        observer.disconnect();
    });

    observer.observe(document.getElementById('root'), { childList: true });

    return page;
};
