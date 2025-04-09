import { ValidationResult } from './types';

/**
 * Валидация пароля
 * @param {string} password пароль
 * @returns {(boolean|string)[]}
 */
export const validatePassword = (
    password: string
): ValidationResult => {
    const regex = /^[a-zA-Z0-9._\-@#$%&*!]+$/;

    if (!regex.test(password)) {
        return { isValid: false, error: 'Пароль должен быть из цифр, латинских букв или символов (._-@#$%&*!)' };
    } else if (password.length > 96) {
        return { isValid: false, error: 'Пароль должен быть не более 96 символов' };
    } else if (password.length < 8) {
        return { isValid: false, error: 'Пароль должен быть не менее 8 символов' };
    }

    return { isValid: true, error: '' };
};
