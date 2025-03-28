import {
    validateBirthday,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateUsername
} from 'shared/validation';
import { debounce } from 'shared/utils';
import { ValidationResult } from 'shared/types/ValidationResult';

interface IValidators {
    email: (_value: string) => ValidationResult;
    username: (_value: string) => ValidationResult;
    birthday: (_value: string) => ValidationResult;
    password: (_value: string) => ValidationResult;
    passwordConfirm: (_value: string) => ValidationResult;
}


export const inputHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const container = target.closest('.input-container');
    if (!container) return;

    const input = container.querySelector('.input__field') as HTMLInputElement;
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

    const eye  = container.querySelector('.input__toggle-password') as HTMLImageElement;
    if (eye !== null) {
        if (showError) {
            eye.style.right = '36px';
        } else {
            eye.style.right = '12px';
        }
    }
};

export const debouncedInputHandler = debounce(inputHandler, 300);
