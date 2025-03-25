import { debouncedInputHandler } from '../handlers/inputHandler';
import { togglePasswordHandler } from '../handlers/togglePasswordHandler';
import { dateHandler } from '../handlers/dateHandler';
import './input.scss';
import inputTemplate from './input.hbs';

/**
 * Создает инпут с иконкой ошибки и полем для сообщения об ошибке
 */
export const Input = (data: Event) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input') as HTMLInputElement;
    inputField.addEventListener('input', debouncedInputHandler);

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password') as HTMLImageElement;
        eye.addEventListener('click', togglePasswordHandler);
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};
