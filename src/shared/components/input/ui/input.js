import { validateEmail } from 'shared/validation';
import { validateBirthday } from 'shared/validation';
import { validatePassword } from 'shared/validation';
import { validatePasswordConfirm } from 'shared/validation';
import { debounce } from 'shared/utils';
import { validateUsername } from 'shared/validation';
import './input.scss';
import inputTemplate from './input.hbs';

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @returns {HTMLDivElement}
 * @param {{type, id, inputLabel, errorMessage, required, maxlength}} data
 */
export const Input = (data) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input');
    inputField.addEventListener('input', debouncedInputHandler);

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password');
        eye.addEventListener('click', togglePasswordHandler);
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};


const inputHandler = (event) => {
    const container = event.target.closest('.input-container');
    const message = container.querySelector('.error-message');
    const input = container.querySelector('.input__field');
    const icon = container.querySelector('.input__error');

    const validators = {
        email: validateEmail,
        username: validateUsername,
        birthday: validateBirthday,
        password: validatePassword,
        passwordConfirm: validatePasswordConfirm,
    };

    const [valid, error] = validators[input.id]?.(input.value) ?? true;

    const showError = !valid && (input.value !== '' || event.target.type === 'date');

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    input.classList.toggle('error', showError);
    message.textContent = error;

    const eye = container.querySelector('.input__toggle-password');
    if (eye !== null) {
        if (showError) {
            eye.style.right = '36px';
        } else {
            eye.style.right = '12px';
        }
    }
};

const debouncedInputHandler = debounce(inputHandler, 300);

const togglePasswordHandler = (event) => {
    const img = event.target;
    const container = img.closest('.input');
    const input = container.querySelector('.input__field');

    if (input.type === 'password') {
        input.type = 'text';
        img.src = 'icons/eye-on.svg';
    } else {
        input.type = 'password';
        img.src = 'icons/eye-off.svg';
    }
};

const dateHandler = (event) => {
    const value = event.target.value;
    const parts = value.split('-');

    if (parts.length < 3) return;

    parts[0] = parts[0].slice(0, 4);
    event.target.value = parts.join('-');
};
