import { debounce } from 'shared/utils';
import type { ValidationResult } from 'shared/validation';
import {
    validateBirthday,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateUsername,
} from 'shared/validation';
import { toggleInputError } from './toggleInputError';

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

    const container = target.closest<HTMLDivElement>('.input-container');
    if (!container) return;

    const input = container.querySelector<HTMLInputElement>('.input__field');
    if (!input) return;

    const validators: IValidators = {
        email: validateEmail,
        username: validateUsername,
        birthday: validateBirthday,
        password: validatePassword,
        passwordConfirm: validatePasswordConfirm,
    };

    const key = input.id as keyof IValidators;

    const result = validators[key]?.(input.value) ?? { isValid: true, error: '' };

    // Use the shared toggleInputError function to handle error display
    toggleInputError(container, result);
};

export const debouncedInputHandler = debounce(inputHandler, 300);
