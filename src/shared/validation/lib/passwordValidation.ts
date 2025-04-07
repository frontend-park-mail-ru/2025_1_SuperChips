import { ValidationResult } from './types';

/**
 * Валидация пароля
 * @param {string} password пароль
 * @returns {(boolean|string)[]}
 */
export const validatePassword = (
    password: string
): ValidationResult => {
    const regex = /^[a-zA-Z0-9]+$/;
    
    // Проверка на null или undefined
    if (!password) {
        return { isValid: false, error: 'Пароль не может быть пустым' };
    }
    
    if (password.length < 8) {
        return { isValid: false, error: 'Пароль должен быть не менее 8 символов' };
    } else if (password.length > 96) {
        return { isValid: false, error: 'Пароль должен быть не более 96 символов' };
    } else if (!regex.test(password)) {
        return { isValid: false, error: 'Пароль должен состоять из цифр или латинских букв' };
    }

    return { isValid: true, error: '' };
};
