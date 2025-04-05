import { validatePassword, validatePasswordConfirm } from 'shared/validation';
import { debounce } from 'shared/utils';

/**
 * Validates password fields in the settings form
 * @param {Event} event - The input event
 */
export const validatePasswordField = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const field = target.id;
    const value = target.value;

    const errorIcon = target.parentElement?.querySelector<HTMLElement>('.error-icon');
    const errorMessage = document.getElementById(`${field}-error`);

    if (!errorIcon || !errorMessage) return;

    let isValid = true;
    let errorText = '';

    // Validate based on field type
    if (field === 'currentPassword') {
        // Current password just needs to not be empty
        isValid = value.length > 0;
        errorText = 'Введите текущий пароль';
    } else if (field === 'newPassword') {
        // Use the shared password validation
        const validationResult = validatePassword(value);
        isValid = validationResult.isValid;
        errorText = validationResult.error || 'Пароль должен быть длиной не менее 8 символов';
        
        // If confirm password field has a value, validate it again when new password changes
        const confirmField = document.querySelector<HTMLInputElement>('#confirmPassword');
        if (confirmField && confirmField.value) {
            // Trigger validation on the confirm password field
            const inputEvent = new Event('input', { bubbles: true });
            confirmField.dispatchEvent(inputEvent);
        }
    } else if (field === 'confirmPassword') {
        // Use the shared password confirmation validation
        const validationResult = validatePasswordConfirm(value);
        isValid = validationResult.isValid;
        errorText = validationResult.error || 'Пароли не совпадают';
    }

    // Show/hide error elements
    const showError = !isValid;
    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = errorText;

    // Add/remove error class on input
    target.classList.toggle('error', showError);

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
