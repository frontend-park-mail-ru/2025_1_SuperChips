import { debouncedPasswordValidation } from '../handlers/passwordValidation';
import { handlePasswordUpdate } from '../handlers/passwordHandler';
import securityTemplate from './SecuritySettings.hbs';
import { Input } from 'shared/components/input';

export const createSecuritySettings = (): HTMLElement => {
    const container = document.createElement('div');

    const fields = [
        {
            type: 'password',
            id: 'currentPassword',
            inputLabel: 'Текущий пароль',
            errorMessage: 'Введите текущий пароль',
            maxlength: 120,
            onInput: debouncedPasswordValidation,
            transparent: true,
        },
        {
            type: 'password',
            id: 'newPassword',
            inputLabel: 'Новый пароль',
            errorMessage: 'Пароль должен быть длиной не менее 8 символов',
            maxlength: 120,
            onInput: debouncedPasswordValidation,
            transparent: true,
        },
        {
            type: 'password',
            id: 'confirmPassword',
            inputLabel: 'Подтвердите новый пароль',
            errorMessage: 'Пароли не совпадают',
            maxlength: 120,
            onInput: debouncedPasswordValidation,
            transparent: true,
        }
    ];
    
    container.innerHTML = securityTemplate({ fields });

    const form = container.querySelector<HTMLFormElement>('.settings-form');
    
    if (form) {
        const inputContainers = form.querySelectorAll('.settings-form > *:not(.submit-button)');
        inputContainers.forEach(container => container.remove());
        
        fields.forEach(field => {
            const inputComponent = Input(field);
            if (inputComponent) {
                form.insertBefore(inputComponent, form.querySelector('.submit-button'));
            }
        });
    }

    form?.addEventListener('submit', handlePasswordUpdate);

    return container;
};
