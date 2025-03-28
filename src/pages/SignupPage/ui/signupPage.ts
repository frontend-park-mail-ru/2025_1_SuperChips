import './signup.scss';
import { Navbar } from 'widgets/navbar';
import { InputTransparent } from 'shared/components/inputTransparent';
import { navigate } from 'shared/router';

/**
 * Renders the signup page
 * @returns {Promise<HTMLDivElement>} The signup page element
 */
export const SignupPage = async (): Promise<HTMLDivElement> => {
    const page = document.createElement('div');
    page.classList.add('signup-page');

    page.appendChild(await Navbar());

    const container = document.createElement('div');
    container.classList.add('signup-container');

    const form = document.createElement('form');
    form.classList.add('signup-form');

    const header = document.createElement('h2');
    header.textContent = 'Регистрация';
    header.classList.add('signup-header');
    form.appendChild(header);

    const fields = [
        { type: 'text', id: 'firstName', inputLabel: 'Имя', errorMessage: 'Введите имя', maxlength: 120, required: true },
        { type: 'text', id: 'lastName', inputLabel: 'Фамилия', errorMessage: 'Введите фамилию', maxlength: 120, required: true },
        { type: 'text', id: 'username', inputLabel: 'Никнейм', errorMessage: 'Неверный формат никнейма', maxlength: 120, required: true },
        { type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', maxlength: 120, required: true },
        { type: 'password', id: 'confirmPassword', inputLabel: 'Подтвердите пароль', errorMessage: 'Пароли не совпадают', maxlength: 120, required: true },
        { type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неверный формат даты', required: true }
    ];

    fields.forEach(field => {
        const inputComponent = InputTransparent(field);
        if (inputComponent) {
            form.appendChild(inputComponent);
        }
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Зарегистрироваться';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton);

    const loginLink = document.createElement('p');
    loginLink.classList.add('login-link');
    loginLink.innerHTML = 'Уже есть аккаунт? <a href="#">Войти</a>';
    form.appendChild(loginLink);

    loginLink.querySelector('a')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login').finally();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Handle signup logic here
        // For now, just navigate to login page
        navigate('login').finally();
    });

    container.appendChild(form);
    page.appendChild(container);

    return page as HTMLDivElement;
};
