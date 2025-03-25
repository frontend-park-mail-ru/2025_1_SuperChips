import { ValidationResult } from 'shared/types/ValidationResult';

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
