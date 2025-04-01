import { InputTransparent } from 'shared/components/inputTransparent';
import { validatePasswordField, debouncedPasswordValidation } from '../handlers/passwordValidation';
import { handlePasswordUpdate } from '../handlers/passwordHandler';
import securityTemplate from './SecuritySettings.hbs';

export const createSecuritySettings = (): HTMLElement => {
    const container = document.createElement('div');

    const fields = [
        { type: 'password', id: 'currentPassword', inputLabel: 'Текущий пароль', errorMessage: 'Введите текущий пароль', maxlength: 120, onInput: debouncedPasswordValidation },
        { type: 'password', id: 'newPassword', inputLabel: 'Новый пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', maxlength: 120, onInput: debouncedPasswordValidation },
        { type: 'password', id: 'confirmPassword', inputLabel: 'Подтвердите новый пароль', errorMessage: 'Пароли не совпадают', maxlength: 120, onInput: debouncedPasswordValidation }
    ];
    
    container.innerHTML = securityTemplate({ fields });
    
    const form = container.querySelector('.settings-form');
    
    if (form) {
        const inputContainers = form.querySelectorAll('.settings-form > *:not(.submit-button)');
        inputContainers.forEach(container => container.remove());
        
        fields.forEach(field => {
            const inputComponent = InputTransparent(field);
            if (inputComponent) {
                form.insertBefore(inputComponent, form.querySelector('.submit-button'));
            }
        });
    }

    if (form) {
        form.addEventListener('submit', handlePasswordUpdate);
    }

    return container;
};