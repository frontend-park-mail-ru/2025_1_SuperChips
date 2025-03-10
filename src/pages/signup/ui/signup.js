import {debouncedPasswordConfirm} from '../handlers/passwordConfirm';
import {signupHandler} from '../handlers/signupHandler';
import {debouncedSignupButton} from '../handlers/signupButtonHandler';
import {createInput} from '../../../shared/components/input/input';
import {goToPage} from '../../../shared/router';
import signupTemplate  from '../../../shared/components/authPage/authPageTemplate.hbs';
import '../../../shared/components/input/input.css';
import '../../../shared/components/authPage/authPage.css';
import './signup.css';


/**
 * Генерирует страницу регистрации и создает обработчики событий
 *
 * @returns {HTMLDivElement}
 */
export const renderSignup = async () => {
    const config = {
        page: 'signup',
        redirectText: 'есть аккаунт?',
        redirectBtn: 'Войти',
        submitBtn: 'Зарегистрироваться',
        header: 'Регистрация',
        subheader: 'Еще пару шагов и Вы с flow!',
        inputs: [
            {type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты', isStarred: true},
            {type: 'text', id: 'username', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято', isStarred: true},
            {type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты', isStarred: true},
            {type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', isStarred: true, isPassword: true},
            {type: 'password', id: 'passwordConfirm', inputLabel: 'Повторите пароль', errorMessage: 'Пароли не совпадают', isStarred: true,  isPassword: true},
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
        item.replaceWith(createInput(config.inputs[index]));
    });

    form.addEventListener('submit', signupHandler);
    form.addEventListener('input', debouncedSignupButton);
    form.addEventListener('input', debouncedPasswordConfirm);

    return page;
};
