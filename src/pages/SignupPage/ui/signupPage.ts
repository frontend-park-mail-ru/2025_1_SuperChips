import type { IInputConfig } from 'shared/components/input/model/types';
import { debouncedPasswordConfirm } from '../handlers/passwordConfirm';
import { debouncedSignupButton } from '../handlers/signupButtonHandler';
import { authPageTemplate, fillPictureBox } from 'pages/LoginPage';
import { signupHandler } from '../handlers/signupHandler';
import { Input } from 'shared/components/input';
import { appState, navigate } from 'shared/router';
import { OneTapButtonObserver } from 'widgets/VKID';
import { root } from 'app/app';
import './signup.scss';


interface SignupPageConfig {
    page: string;
    redirectText: string;
    redirectBtn: string;
    submitBtn: string;
    header: string;
    subheader: string;
    mobile: boolean,
    inputs: IInputConfig[];
}

/**
 * Генерирует страницу регистрации и создает обработчики событий
 */
export const SignupPage = async (): Promise<HTMLDivElement> => {
    const config: SignupPageConfig = {
        page: 'signup',
        redirectText: 'Есть аккаунт?',
        redirectBtn: 'Войти',
        submitBtn: 'Зарегистрироваться',
        header: 'Регистрация',
        subheader: 'Ещё пару шагов и вы с flow!',
        mobile: appState.mobile,
        inputs: [
            {
                type: 'email',
                id: 'email',
                inputLabel: 'Email',
                errorMessage: 'Введите email в формате user@domain.ru',
                required: true,
                maxlength: 64,
                autocomplete: 'username'
            },
            {
                type: 'text',
                id: 'username',
                inputLabel: 'Имя пользователя',
                errorMessage: 'Это имя уже занято',
                required: true,
                maxlength: 32
            },
            {
                type: 'password',
                id: 'password',
                inputLabel: 'Пароль',
                errorMessage: 'Пароль должен быть длиной не менее 8 символов',
                required: true,
                isPassword: true,
                maxlength: 96,
                autocomplete: 'current-password'
            },
            {
                type: 'password',
                id: 'passwordConfirm',
                inputLabel: 'Повторите пароль',
                errorMessage: 'Пароли не совпадают',
                required: true,
                isPassword: true,
                maxlength: 120
            },
        ]
    };

    const html = authPageTemplate(config);
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', html);

    const redirectBtn = page.querySelector<HTMLAnchorElement>('.redirect');
    if (!redirectBtn) return page;

    redirectBtn.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        navigate('login').finally();
    });

    const form = page.querySelector<HTMLFormElement>('.signup-form');
    if (!form) return page;

    const placeholders = form.querySelectorAll('.input-placeholder');
    placeholders.forEach((item, index) => {
        const newInput = Input(config.inputs[index]);
        if (newInput)
            item.replaceWith(newInput);
    });

    form.addEventListener('submit', signupHandler);
    form.addEventListener('input', debouncedSignupButton);
    form.addEventListener('input', debouncedPasswordConfirm);

    const observer = new MutationObserver(() => {
        fillPictureBox(11);
        observer.disconnect();
    });

    const rootElement = document.getElementById('root');
    if (rootElement)
        observer.observe(rootElement, { childList: true });

    const VKIDObserver = OneTapButtonObserver();

    VKIDObserver.observe(root, { childList: true });

    return page;
};
