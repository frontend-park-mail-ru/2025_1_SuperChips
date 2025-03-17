import { debouncedPasswordConfirm } from '../handlers/passwordConfirm';
import { debouncedSignupButton } from '../handlers/signupButtonHandler';
import { signupHandler } from '../handlers/signupHandler';
import { Input } from '../../../shared/components/input';
import { goToPage } from '../../../shared/router/router';
import signupTemplate  from '../../LoginPage/authPage/authPageTemplate.hbs';
import '../../../shared/components/input/ui/input.scss';
import '../../LoginPage/authPage/authPage.scss';
import './signup.scss';
import { fillPictureBox } from '../../LoginPage/lib/fillPictureBox';


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
                errorMessage: 'Неправильный формат почты',
                required: true,
                maxlength: 120,
                autocomplete: 'username'
            },
            {
                type: 'text',
                id: 'username',
                inputLabel: 'Имя пользователя',
                errorMessage: 'Это имя уже занято',
                required: true,
                maxlength: 120 },
            {
                type: 'date',
                id: 'birthday',
                inputLabel: 'Дата рождения',
                errorMessage: 'Неправильный формат даты',
                required: true
            },
            {
                type: 'password',
                id: 'password',
                inputLabel: 'Пароль',
                errorMessage: 'Пароль должен быть длиной не менее 8 символов',
                required: true,
                isPassword: true,
                maxlength: 120,
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

    const html = signupTemplate(config);
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', html);

    const redirectBtn = page.querySelector('.redirect');
    redirectBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        await goToPage('login');
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
