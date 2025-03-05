import { validateNickname } from "../validation/nicknameValidation.js";
import { validateBirthday } from "../validation/birthdayValidation.js";
import { validatePassword } from "../validation/passwordValidation.js";
import { validateEmail } from "../validation/emailValidation.js";
import { debounce } from "../utils/debounce.js";

const inputHandler = (event) => {
	const container = event.target.closest('.input-container');
	const message = container.querySelector('.error-message');
	const input = container.querySelector('.input__field');
	const icon = container.querySelector('.input__error');

	const validators = {
		email: validateEmail,
		text: validateNickname,
		date: validateBirthday,
		password: validatePassword,
	};

	const [valid, error] = validators[input.type]?.(input.value) ?? true;

	const showError = !valid && input.value !== '';
	icon.classList.toggle('hidden', !showError);
	message.classList.toggle('hidden', !showError);
	message.textContent = error;
}

export const debouncedInputHandler = debounce(inputHandler, 300);