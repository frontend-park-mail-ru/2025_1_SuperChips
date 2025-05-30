import { ValidationResult } from './types';

/**
 * Валидация почты
 * @param {string} email - почта
 * @returns {(""|boolean|string)[]}
 */
export const validateEmail = (
    email: string
): ValidationResult => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (!regex.test(email)) {
        return { isValid: false, error: 'Введите email в формате user@domain.ru' };
    } else if (email.length > 64) {
        return { isValid: false, error: 'Email должен быть не более 64 символов' };
    }

    return { isValid: true, error: '' };
};
