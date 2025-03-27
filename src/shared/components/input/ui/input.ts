import { debouncedInputHandler } from '../handlers/inputHandler';
import { togglePasswordHandler } from '../handlers/togglePasswordHandler';
import { dateHandler } from '../handlers/dateHandler';
import { IInputConfig } from '../model/types';
import './input.scss';
import inputTemplate from './input.hbs';

/**
 * Создает инпут с иконкой ошибки и полем для сообщения об ошибке
 */
export const Input = (data: IInputConfig) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input');
    if (!inputField) return null;

    inputField.addEventListener('input', debouncedInputHandler);

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password');
        if (eye) eye.addEventListener('click', togglePasswordHandler);
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};
