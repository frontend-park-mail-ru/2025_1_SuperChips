import {validateEmail} from "./emailValidation.js";
import {validateNickname} from "./nicknameValidation.js";
import {validateBirthday} from "./birthdayValidation.js";
import {validatePassword} from "./passwordValidation.js";


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
		email: true,
		nickname: true,
		birthday: true,
		password: true,
		passwordConfirm: true
	}

	if (!validateEmail(email)) {
		result.email = false;
	}

	if (!validateNickname(nickname)) {
		result.nickname = false;
	}

	if (!validateBirthday(birthday)) {
		result.birthday = false;
	}

	if (!validatePassword(password)) {
		result.password = false;
	}

	if (password !== passwordConfirm) {
		result.passwordConfirm = false;
	}

	return result;
}
