import { validateEmail, validatePassword, validateUsername } from 'shared/validation';
import type { ISignupFormData } from '../model/types';


/**
 * Валидация формы регистрации
 * @param email почта
 * @param username имя пользователя
 * @param birthday дата рождения
 * @param password пароль
 * @param passwordConfirm подтверждение пароля
 * @returns {boolean}
 */
export const validateSignup = (
    {   email,
        username,
        password,
        passwordConfirm
    }: ISignupFormData): boolean => {
    const result = {
        email: validateEmail(email).isValid,
        username: validateUsername(username).isValid,
        password: validatePassword(password).isValid,
        passwordConfirm: password === passwordConfirm && password !== ''
    };

    return Object.values(result).every(Boolean);
};
