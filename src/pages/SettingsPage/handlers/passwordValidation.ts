import { validatePassword } from 'shared/validation';
import { debounce } from 'shared/utils';

export const validatePasswordField = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const field = target.id;
    const value = target.value;

    const errorIcon = document.querySelector<HTMLElement>(`#${field}-error-icon`);
    const errorMessage = document.querySelector<HTMLElement>(`#${field}-error`);

    if (!errorIcon || !errorMessage) return;

    let showError = false;
    let errorText = '';

    if (field === 'newPassword') {
        const validationResult = validatePassword(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error || 'Пароль должен быть длиной не менее 8 символов';
    } else if (field === 'confirmPassword') {
        const newPasswordInput = document.querySelector<HTMLInputElement>('#newPassword');
        if (newPasswordInput) {
            showError = value !== newPasswordInput.value;
            errorText = 'Пароли не совпадают';
        }
    }

    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = errorText;

    target.classList.toggle('error', showError);
};

export const debouncedPasswordValidation = debounce(validatePasswordField, 300);
