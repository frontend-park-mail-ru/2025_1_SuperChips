import { ValidationResult } from 'shared/validation';
import {
    validateBirthday,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateUsername
} from 'shared/validation';
import { debounce } from 'shared/utils';

interface IValidators {
    email: (value: string) => ValidationResult;
    username: (value: string) => ValidationResult;
    birthday: (value: string) => ValidationResult;
    password: (value: string) => ValidationResult;
    passwordConfirm: (value: string) => ValidationResult;
}


export const inputHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const container = target.closest('.input-container');
    if (!container) return;

    const input = container.querySelector<HTMLInputElement>('.input__field');
    const message = container.querySelector('.error-message');
    const icon = container.querySelector('.input__error');
    if (!message || !input || !icon) return;

    const validators: IValidators = {
        email: validateEmail,
        username: validateUsername,
        birthday: validateBirthday,
        password: validatePassword,
        passwordConfirm: validatePasswordConfirm,
    };

    const key = input.id as keyof IValidators;

    const result = validators[key]?.(input.value) ?? { isValid: true, error: '' };
    const valid = result.isValid;
    const error = result.error;

    const showError = !valid && (input.value !== '' || target.type === 'date');

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    input.classList.toggle('error', showError);
    message.textContent = error;

    const eye  = container.querySelector<HTMLImageElement>('.input__toggle-password');
    if (eye) {
        eye.style.right = showError ? '36px' : '12px';
    }
};

export const debouncedInputHandler = debounce(inputHandler, 300);
