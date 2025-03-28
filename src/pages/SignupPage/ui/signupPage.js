import { debouncedPasswordConfirm } from '../handlers/passwordConfirm';
import { debouncedSignupButton } from '../handlers/signupButtonHandler';
import { fillPictureBox } from '../../LoginPage/lib/fillPictureBox';
import { signupHandler } from '../handlers/signupHandler';
import { Input } from 'shared/components/input';
import { navigate } from 'shared/router';
import { authPageTemplate } from 'pages/LoginPage';
import './signup.scss';


/**
 * Генерирует страницу регистрации и создает обработчики событий
 *
 * @returns {HTMLDivElement}
 */
export const SignupPage = async () => {
    const config = {
        page: 'signup',
        redirectText: 'Есть аккаунт?',
        redirectBtn: 'Войти',
        submitBtn: 'Зарегистрироваться',
        header: 'Регистрация',
        subheader: 'Ещё пару шагов и вы с flow!',
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
                maxlength: 32 },
            {
                type: 'date',
                id: 'birthday',
                inputLabel: 'Дата рождения',
                errorMessage: 'Введите дату в формате ДД.ММ.ГГГГ',
                required: true
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

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click',  (event) => {
        event.preventDefault();
        navigate('login').finally();
    });

    const form = page.querySelector('.signup-form');
    const placeholders = form.querySelectorAll('.input-placeholder');
    placeholders.forEach((item, index) => {
        item.replaceWith(Input(config.inputs[index]));
    });

    form.addEventListener('submit', signupHandler);
    form.addEventListener('input', debouncedSignupButton);
    form.addEventListener('input', debouncedPasswordConfirm);

    const observer = new MutationObserver(() => {
        fillPictureBox(2);
        observer.disconnect();
    });

    observer.observe(document.getElementById('root'), { childList: true });

    return page;
};
