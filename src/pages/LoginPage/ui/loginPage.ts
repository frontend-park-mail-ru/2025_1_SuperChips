import { OneTapButtonObserver } from 'widgets/VKID';
import { debouncedLoginButton } from '../handlers/loginButtonHandler';
import { handleLogin } from '../handlers/loginHandler';
import { fillPictureBox } from '../lib/fillPictureBox';
import { appState, navigate } from 'shared/router';
import { Input } from 'shared/components/input';
import { root } from 'app/app';
import loginTemplate from '../authPage/authPageTemplate.hbs';
import '../authPage/authPage.scss';
import './login.scss';


/**
 * Генерирует страницу логина и создает обработчики событий
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
                maxlength: 64,
                autocomplete: 'username',
            },
            {
                type: 'password',
                id: 'password',
                inputLabel: 'Пароль',
                errorMessage: 'Неправильный пароль или почта',
                isPassword: true,
                maxlength: 96,
                autocomplete: 'current-password',
            }
        ],
        page: 'login',
        redirectText: 'Ещё нет аккаунта?',
        redirectBtn: 'Регистрация',
        submitBtn: 'Вход',
        header: 'Вход',
        subheader: 'Добро пожаловать во flow!',
        mobile: appState.mobile,
    };

    const html = loginTemplate(config);
    page.insertAdjacentHTML('beforeend', html);

    const form = page.querySelector('.login-form');
    if (form) {
        const placeholders = form.querySelectorAll('.input-placeholder');
        placeholders.forEach((item, index) => {
            const newInput = Input(config.inputs[index]);
            if (newInput) {
                item.replaceWith(newInput);
            }
        });

        form.addEventListener('submit', handleLogin);
        form.addEventListener('input', debouncedLoginButton);
    }

    const redirectBtn = page.querySelector('.redirect');

    if (redirectBtn) {
        redirectBtn.addEventListener('click',  async(event) => {
            event.preventDefault();
            navigate('signup').finally();
        });
    }

    const observer = new MutationObserver(() => {
        fillPictureBox(1);
        observer.disconnect();
    });

    const rootElement = document.getElementById('root');
    if (rootElement) {
        observer.observe(rootElement, { childList: true });
    }

    const VKIDObserver = OneTapButtonObserver();
    VKIDObserver.observe(root, { childList: true });

    return page;
};


