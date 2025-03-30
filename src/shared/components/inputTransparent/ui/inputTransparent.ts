import { dateHandler, togglePasswordHandler } from 'shared/components/input';
import inputTemplate from './inputTransparent.hbs';
import './inputTransparent.scss';
import { IInputConfig } from 'shared/types/InputConfig';

/**
 * Создает инпут с иконкой ошибки и сообщением об ошибке
 */
export const InputTransparent = (data: IInputConfig) => {
    const inputContainer = document.createElement('div');
    const templateData = {
        ...data,
        isPassword: data.type === 'password'
    };
    inputContainer.insertAdjacentHTML('beforeend', inputTemplate(templateData));

    const inputField = inputContainer.querySelector('input');
    if (!inputField) return;

    // Add validation event listener if provided
    if (data.onInput) {
        inputField.addEventListener('input', data.onInput);
    }

    if (data.type === 'password') {
        const eye = inputContainer.querySelector('.inputTransparent__toggle-password');
        if (eye) {
            eye.addEventListener('click', togglePasswordHandler);
        }
    }

    if (data.type === 'date') {
        inputField.addEventListener('input', dateHandler);
    }

    return inputContainer;
};
