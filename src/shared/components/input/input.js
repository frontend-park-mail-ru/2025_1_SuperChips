import './input.css'
import inputTemplate from './input.hbs'
import { debouncedInputHandler } from "../../handlers/inputHandler.js";

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


