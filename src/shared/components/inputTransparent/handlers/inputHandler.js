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
    const input = container.querySelector('.inputTransparent__field');
    const icon = container.querySelector('.inputTransparent__error');

    const validators = {
        email: validateEmail,
        username: validateUsername,
        birthday: validateBirthday,
        password: validatePassword,
        passwordConfirm: validatePasswordConfirm,
    };

    const result = validators[input.id]?.(input.value) ?? { isValid: true, error: '' };
    const valid = result.isValid;
    const error = result.error;

    const showError = !valid && (input.value !== '' || event.target.type === 'date');

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    input.classList.toggle('error', showError);
    message.textContent = error;

    const eye = container.querySelector('.inputTransparent__toggle-password');
    if (eye !== null) {
        if (showError) {
            eye.style.right = '36px';
        } else {
            eye.style.right = '12px';
        }
    }
};

export const debouncedInputHandler = debounce(inputHandler, 300);
