import { validatePassword, validatePasswordConfirm } from 'shared/validation';
import { debounce } from 'shared/utils';

/**
 * Validates password fields in the settings form
 * @param {Event} event - The input event
 */
import { validatePassword as validatePasswordShared } from '../../../../shared/validation/lib/passwordValidation';

export const validatePasswordField = (event: Event, form?: HTMLFormElement): void => {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const container = target.closest('.input-container');
    if (!container) return;

    const input = container.querySelector<HTMLInputElement>('.input__field');
    const message = container.querySelector('.error-message');
    const icon = container.querySelector('.input__error');
    const eye = container.querySelector<HTMLImageElement>('.input__toggle-password');
    
    if (!message || !input || !icon) return;

    let result = { isValid: true, error: '' };

    switch(target.id) {
        case 'currentPassword':
            result = { isValid: target.value.length > 0, error: target.value.length > 0 ? '' : 'Введите текущий пароль' };
            break;
        case 'newPassword':
            result = validatePassword(target.value);
            break;
        case 'confirmPassword':
            const newPassword = form?.querySelector<HTMLInputElement>('#newPassword')?.value;
            result = { isValid: target.value === newPassword, error: target.value === newPassword ? '' : 'Пароли не совпадают' };
            break;
    }

    const showError = !result.isValid && target.value !== '';

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    input.classList.toggle('error', showError);
    message.textContent = result.error;

    if (eye) {
        eye.style.right = showError ? '36px' : '12px';
    }

    // Update submit button state
    updateSubmitButtonState();
};

/**
 * Updates the submit button state based on form validity
 */
const updateSubmitButtonState = (): void => {
    const form = document.querySelector('.settings-form');
    const submitButton = form?.querySelector('.submit-button') as HTMLButtonElement;
    if (!submitButton) return;

    const currentPassword = document.querySelector<HTMLInputElement>('#currentPassword');
    const newPassword = document.querySelector<HTMLInputElement>('#newPassword');
    const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword');

    if (!currentPassword || !newPassword || !confirmPassword) return;

    // Check if any field has an error class or is empty
    const hasErrors = [
        currentPassword.classList.contains('error'),
        newPassword.classList.contains('error'),
        confirmPassword.classList.contains('error')
    ].some(Boolean);

    const allFilled = [
        currentPassword.value,
        newPassword.value,
        confirmPassword.value
    ].every(value => value.length > 0);

    // Enable button only if all fields are filled and there are no errors
    submitButton.disabled = hasErrors || !allFilled;
};

// Use a short debounce time for responsive validation
export const debouncedPasswordValidation = debounce(validatePasswordField, 100);
