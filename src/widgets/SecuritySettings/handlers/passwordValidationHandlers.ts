import { validatePassword } from 'shared/validation';
import { debounce } from 'shared/utils';

const passwordConfirm = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.id !== 'confirmPassword') return;

    const password = document.querySelector<HTMLInputElement>('#newPassword')?.value || '';
    const confirm = document.querySelector<HTMLInputElement>('#confirmPassword')?.value || '';
    const message = document.querySelector('#confirmPassword-error');
    const icon = document.querySelector('#confirmPassword-error-icon');
    const eye = document.querySelector<HTMLImageElement>('#confirmPassword-eye');

    if (!message || !icon || !eye) return;

    const showError = password && confirm && password !== confirm;
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    message.textContent = 'Пароли не совпадают';

    eye.style.right = showError ? '36px' : '12px';
    eye.style.filter = 'brightness(1.5)';

    const inputWrapper = target.closest('.input-wrapper');
    if (inputWrapper) {
        inputWrapper.classList.toggle('error', showError);
    }
    target.classList.toggle('error', showError);
};

export const debouncedPasswordConfirm = debounce(passwordConfirm, 300);

const validateNewPassword = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.id !== 'newPassword') return;

    const value = target.value;
    const errorIcon = document.querySelector<HTMLElement>('#newPassword-error-icon');
    const errorMessage = document.querySelector<HTMLElement>('#newPassword-error');
    const eye = document.querySelector<HTMLImageElement>('#newPassword-eye');

    if (!errorIcon || !errorMessage || !eye) return;

    const validationResult = validatePassword(value);
    const showError = !validationResult.isValid;

    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = validationResult.error;

    eye.style.right = showError ? '36px' : '12px';
    eye.style.filter = 'brightness(1.5)';

    const inputWrapper = target.closest('.input-wrapper');
    if (inputWrapper) {
        inputWrapper.classList.toggle('error', showError);
    }
    target.classList.toggle('error', showError);

    const confirmInput = document.querySelector<HTMLInputElement>('#confirmPassword');
    if (confirmInput?.value) {
        passwordConfirm({ target: confirmInput } as Event);
    }
};

export const debouncedValidateNewPassword = debounce(validateNewPassword, 300);

export const passwordConfirmHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    
    if (target.id === 'newPassword') {
        debouncedValidateNewPassword(event);
    }
    
    if (target.id === 'confirmPassword') {
        debouncedPasswordConfirm(event);
    }
};
