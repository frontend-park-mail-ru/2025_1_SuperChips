import { ValidationResult } from './types';

export const validatePasswordConfirm = (
    confirm: string
): ValidationResult => {
    const passwordField: HTMLInputElement | null = document.querySelector('#password');
    const password = passwordField?.value;

    if (password !== confirm) {
        return { isValid: false, error: 'Пароли не совпадают' };
    }
    return { isValid: true, error: '' };
};
