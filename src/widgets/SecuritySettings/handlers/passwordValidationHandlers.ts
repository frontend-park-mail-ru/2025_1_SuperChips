import { validatePassword } from 'shared/validation';
import { toggleInputError } from 'shared/components/input';
import { debounce } from 'shared/utils';

export const validationState = {
    new_password: false,
    confirm: false,
};


const passwordConfirm = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const container = target.closest('.input-container');
    if (target.id !== 'confirmPassword' || !container) return;

    const password = document.querySelector<HTMLInputElement>('#newPassword')?.value || '';
    const confirm = document.querySelector<HTMLInputElement>('#confirmPassword')?.value || '';
    const valid = Boolean(password && confirm && password === confirm);

    toggleInputError(container, { isValid: valid, error: 'Пароли не совпадают' });

    validationState.confirm = valid;
};


const validateNewPassword = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const container = target.closest('.input-container');
    if (target.id !== 'newPassword' || !container) return;

    const oldPassword = document.querySelector<HTMLInputElement>('#currentPassword')?.value;
    const validationResult = validatePassword(target.value, oldPassword);
    toggleInputError(container, validationResult);

    const confirmInput = document.querySelector<HTMLInputElement>('#confirmPassword');
    if (confirmInput?.value) {
        const event = new Event('input');
        Object.defineProperty(event, 'target', { value: confirmInput });
        passwordConfirm(event);
    }

    validationState.new_password = validationResult.isValid;
};


const passwordConfirmHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.id === 'newPassword') {
        validateNewPassword(event);
    }
    
    if (target.id === 'confirmPassword') {
        passwordConfirm(event);
    }

    const oldPasswordField = document.querySelector<HTMLInputElement>('#currentPassword');
    const oldValid = oldPasswordField?.value ? oldPasswordField.value : false;

    const valid = validationState.new_password && validationState.confirm && oldValid;
    const button = document.querySelector<HTMLButtonElement>('.submit-button');
    if (button) button.disabled = !valid;
};


export const debouncedPasswordConfirmHandler = debounce(passwordConfirmHandler, 300);
