import { validatePassword } from 'shared/validation';
import { debounce } from 'shared/utils';

const passwordValidation = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement;
    const field = target.id;
    const value = target.value;

    const errorIcon = document.querySelector<HTMLElement>(`#${field}-error-icon`);
    const errorMessage = document.querySelector<HTMLElement>(`#${field}-error`);
    const eye = document.querySelector<HTMLElement>(`#${field}-eye`);

    if (!errorIcon || !errorMessage || !eye) return;

    let showError = false;
    let errorText = '';

    if (field === 'newPassword') {
        const validationResult = validatePassword(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error;
    } else if (field === 'confirmPassword') {
        const newPassword = document.querySelector<HTMLInputElement>('#newPassword')?.value || '';
        showError = value !== newPassword;
        errorText = 'Пароли не совпадают';
    }

    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = errorText;
    eye.style.right = showError ? '36px' : '12px';

    target.classList.toggle('error', showError);
};

export const debouncedPasswordValidation = debounce(passwordValidation, 300);
