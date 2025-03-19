import { ValidationResult } from './type';

/**
 * Валидация почты
 * @param {string} email - почта
 * @returns {(""|boolean|string)[]}
 */
export const validateEmail = (
    email: string
): ValidationResult => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length > 64) {
        return { isValid: false, error: 'Email должен быть не более 64 символов' };
    } else if (!regex.test(email)) {
        return { isValid: false, error: 'Введите email в формате user@domain.ru' };
    }
    return { isValid: true, error: '' };
};
