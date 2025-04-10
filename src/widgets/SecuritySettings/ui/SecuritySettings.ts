import { Input } from 'shared/components/input';
import { debounce } from 'shared/utils';
import { handlePasswordUpdate } from '../handlers/passwordHandler';
import { passwordConfirmHandler } from '../handlers/passwordValidationHandlers';
import securityTemplate from './SecuritySettings.hbs';

export const createSecuritySettings = (): HTMLElement => {
    const container = document.createElement('div');

    const fields = [
        {
            type: 'password',
            id: 'currentPassword',
            inputLabel: 'Текущий пароль',
            errorMessage: 'Введите текущий пароль',
            maxlength: 120,
            isPassword: true,
            transparent: true,
            required: true
        },
        {
            type: 'password',
            id: 'newPassword',
            inputLabel: 'Новый пароль',
            errorMessage: 'Пароль должен быть длиной не менее 8 символов',
            maxlength: 120,
            isPassword: true,
            transparent: true,
            required: true
        },
        {
            type: 'password',
            id: 'confirmPassword',
            inputLabel: 'Подтвердите новый пароль',
            errorMessage: 'Пароли не совпадают',
            maxlength: 120,
            isPassword: true,
            transparent: true,
            required: true
        }
    ];
    
    container.innerHTML = securityTemplate({ fields });

    const form = container.querySelector('.settings-form');

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

    if (form) {
        form.addEventListener('submit', (event: Event) => {
            handlePasswordUpdate(event as SubmitEvent);
        });
        form.addEventListener('input', debounce(passwordConfirmHandler, 300));
    }

    return container;
};
