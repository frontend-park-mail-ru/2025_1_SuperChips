import {validateEmail} from "../validation/emailValidation.js";
import {validateNickname} from "../validation/nicknameValidation.js";
import {validateBirthday} from "../validation/birthdayValidation.js";
import {validatePassword} from "../validation/passwordValidation.js";


/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @param type тип вводимых данных
 * @param id ID которое будет присвоено блоку
 * @param inputLabel подпись для инпута
 * @param errorMessage сообщение об ошибке
 * @returns {HTMLDivElement}
 */
export const createInput = ({type, id, inputLabel, errorMessage}) => {
	const inputContainer = document.createElement('div');
	inputContainer.innerHTML = `
        <label for=${id}>${inputLabel}</label>
        <div class='input-container' id="${id}-container">
            <input type=${type} class='input-container__field' id=${id}>
            <img src='/icons/error.svg' class='input-container__error hidden' aria-hidden='true' alt=''>
        </div>
        <p class='error-message error-label hidden' id=${id}-error>${errorMessage}</p>
    `;

	const inputField = inputContainer.querySelector('input');
	inputField.addEventListener('change', () => {

		const inputData = inputField.value;
		let valid = true;

		switch (id) {
			case 'email':
				valid = validateEmail(inputData);
				break;
			case 'nickname':
				valid = validateNickname(inputData);
				break;
			case 'date':
				valid = validateBirthday(inputData);
				break;
			case 'password':
				valid = validatePassword(inputData);
				break;
			default:
				break;
		}

		const icon = inputContainer.querySelector('img');
		const message = inputContainer.querySelector('p');
		if (!valid && inputData !== '') {
			icon.classList.remove('hidden');
			message.classList.remove('hidden');
			return;
		}

		if (!icon.classList.contains('hidden')) {
			icon.classList.add('hidden');
		}
		if (!message.classList.contains('hidden')) {
			message.classList.add('hidden');
		}
	});

	return inputContainer;
}
