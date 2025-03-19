import {
    validateBirthday,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateUsername
} from 'shared/validation';
import { debounce } from 'shared/utils';

export const inputHandler = (event) => {
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

    // const { valid, error } = validators[input.id]?.(input.value) ?? true;

    const result = validators[input.id]?.(input.value);
    const valid = result?.isValid;
    const error = result?.error;

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

export const debouncedInputHandler = debounce(inputHandler, 300);
