import { validateEmail } from "../../validation/emailValidation.js";
import { validateNickname } from "../../validation/nicknameValidation.js";
import { validateBirthday } from "../../validation/birthdayValidation.js";
import { validatePassword } from "../../validation/passwordValidation.js";
import { debounce } from "../../utils/debounce.js";
import './input.css'
import inputTemplate from './input.hbs'

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @returns {HTMLDivElement}
 * @param {{type, id, inputLabel, errorMessage, isStarred}} data
 */
export const createInput = (data) => {
	const inputContainer = document.createElement('div');
	inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data))

	const inputField = inputContainer.querySelector('input');
	inputField.addEventListener('input', debouncedInputHandler);

	return inputContainer;
}

const inputHandler = (event) => {
	const inputField = event.target;
	const inputData = inputField.value;

	const validators = {
		email: validateEmail,
		text: validateNickname,
		date: validateBirthday,
		password: validatePassword,
	};

	const valid = validators[inputField.type]?.(inputData) ?? true;


	const container = inputField.closest('.input-container');
	const icon = container.querySelector('.input__error');
	const message = container.querySelector('.error-label');

	const showError = !valid && inputData !== '';
	icon.classList.toggle('hidden', !showError);
	message.classList.toggle('hidden', !showError);
}

const debouncedInputHandler = debounce(inputHandler, 300);