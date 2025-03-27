import { ValidationResult } from './types';

/**
 * Валидация имени пользователя
 * @param {string} username имя пользователя
 * @returns {(boolean|string)[]}
 */
export const validateUsername = (
    username: string
): ValidationResult => {
    if (username === '') {
        return { isValid: false, error: 'Введите имя пользователя' };
    } else if (username.length < 2) {
        return { isValid: false, error:'Имя пользователя должно быть не менее 2 символов' };
    } else if (username.length > 32) {
        return { isValid: false, error:'Имя пользователя должно быть не более 32 символов' };
    }
    return { isValid: username !== '', error: 'Это имя уже занято' };
};
