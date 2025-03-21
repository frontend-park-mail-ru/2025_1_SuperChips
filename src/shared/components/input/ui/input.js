import { debouncedInputHandler } from '../handlers/inputHandler';
import { togglePasswordHandler } from '../handlers/togglePasswordHandler';
import { dateHandler } from '../handlers/dateHandler';
import './input.scss';
import inputTemplate from './input.hbs';

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @returns {HTMLDivElement}
 * @param {{type, id, inputLabel, errorMessage, required, maxlength}} data
 */
export const Input = (data) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input');
    inputField.addEventListener('input', debouncedInputHandler);

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password');
        eye.addEventListener('click', togglePasswordHandler);
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};
