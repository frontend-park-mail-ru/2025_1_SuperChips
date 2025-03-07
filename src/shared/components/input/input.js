import { validateEmail } from '../../validation/emailValidation';
import { validateNickname } from '../../validation/nicknameValidation';
import { validateBirthday } from '../../validation/birthdayValidation';
import { validatePassword } from '../../validation/passwordValidation';
import { validatePasswordConfirm } from '../../validation/passwordConfirmation';
import { debounce } from '../../utils/debounce';
import './input.css';
import inputTemplate from './input.hbs';

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @returns {HTMLDivElement}
 * @param {{type, id, inputLabel, errorMessage, isStarred}} data
 */
export const createInput = (data) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input');
    inputField.addEventListener('input', debouncedInputHandler);

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password');
        eye.addEventListener('click', togglePasswordHandler);
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
        nickname: validateNickname,
        birthday: validateBirthday,
        password: validatePassword,
        passwordConfirm: validatePasswordConfirm,
    };

    const [valid, error] = validators[input.id]?.(input.value) ?? true;

    const showError = !valid && input.value !== '';
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
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

export const togglePasswordHandler = (event) => {
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
