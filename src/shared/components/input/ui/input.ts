import { debouncedInputHandler } from '../handlers/inputHandler';
import { togglePasswordHandler } from '../handlers/togglePasswordHandler';
import { dateHandler } from '../handlers/dateHandler';
import { IInputConfig } from '../model/types';
import inputTemplate from './input.hbs';
import './input.scss';
import './inputTransparent.scss';

/**
 * Создает инпут с иконкой ошибки и полем для сообщения об ошибке
 */
export const Input = (data: IInputConfig) => {
    const inputContainer = document.createElement('div');
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(data));

    const inputField = inputContainer.querySelector('input');
    if (!inputField) return null;

    inputField.addEventListener('input', debouncedInputHandler);
    
    if (data.onInput) {
        inputField.addEventListener('input', (e) => {
            data.onInput?.(e, inputContainer.closest('form') || undefined);
        });
    }

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.input__toggle-password');
        eye?.addEventListener('click', togglePasswordHandler);
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};
