import { validateEmail } from '../../../shared/validation/emailValidation';
import { validateBirthday } from '../../../shared/validation/birthdayValidation';
import { validatePassword } from '../../../shared/validation/passwordValidation';
import { validateUsername } from '../../../shared/validation/usernameValidation';


/**
 * Валидация формы регистрации
 * @param email почта
 * @param username имя пользователя
 * @param birthday дата рождения
 * @param password пароль
 * @param passwordConfirm подтверждение пароля
 * @returns {boolean}
 */
export const validateSignup = ({email, username, birthday, password, passwordConfirm}) => {
    const result = {
        email: validateEmail(email)[0],
        username: validateUsername(username)[0],
        birthday: validateBirthday(birthday)[0],
        password: validatePassword(password)[0],
        passwordConfirm: password === passwordConfirm && password !== ''
    };

    return Object.values(result).every(Boolean);
};
