import {validateEmail} from '../../../shared/validation/emailValidation';
import {validateNickname} from '../../../shared/validation/nicknameValidation';
import {validateBirthday} from '../../../shared/validation/birthdayValidation';
import {validatePassword} from '../../../shared/validation/passwordValidation';


/**
 * Валидация формы регистрации
 * @param email почта
 * @param nickname имя пользователя
 * @param birthday дата рождения
 * @param password пароль
 * @param passwordConfirm подтверждение пароля
 * @returns {boolean}
 */
export const validateSignup = ({email, nickname, birthday, password, passwordConfirm}) => {
    const result = {
        email: validateEmail(email)[0],
        nickname: validateNickname(nickname)[0],
        birthday: validateBirthday(birthday)[0],
        password: validatePassword(password)[0],
        passwordConfirm: password === passwordConfirm && password !== ''
    };

    return Object.values(result).every(Boolean);
};
