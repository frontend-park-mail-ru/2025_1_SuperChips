import { debouncedInputHandler } from '../handlers/inputHandler';
import { togglePasswordHandler } from '../handlers/togglePasswordHandler';
import { dateHandler } from '../handlers/dateHandler';
import './inputTransparent.scss';
import inputTemplate from './inputTransparent.hbs';

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 * @returns {HTMLDivElement}
 * @param {{type, id, inputLabel, errorMessage, required, maxlength}} data
 */
export const InputTransparent = (data) => {
    const inputContainer = document.createElement('div');
    const templateData = {
        ...data,
        isPassword: data.type === 'password'
    };
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(templateData));

    const inputField = inputContainer.querySelector('input');
    if (inputField) {
        inputField.addEventListener('input', debouncedInputHandler);

        if (data.type === 'password') {
            const eye = inputContainer.querySelector('.inputTransparent__toggle-password');
            if (eye) {
                eye.addEventListener('click', togglePasswordHandler);
            }
        }

        if (data.type === 'date') {
            inputField.addEventListener('input', dateHandler);
        }
    }

    return inputContainer;
};
