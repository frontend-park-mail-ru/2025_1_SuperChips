import { dateHandler, debouncedInputHandler, togglePasswordHandler } from 'shared/components/input';
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

    return inputContainer;
};
