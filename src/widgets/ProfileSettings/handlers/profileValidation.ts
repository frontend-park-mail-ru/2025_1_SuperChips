import { validateUsername, validateBirthday } from 'shared/validation';
import { debounce } from 'shared/utils';

export const validateProfileField = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const field = target.id;
    const value = target.value;

    const errorIcon = document.querySelector<HTMLElement>(`#${field}-error-icon`);
    const errorMessage = document.querySelector<HTMLElement>(`#${field}-error`);

    if (!errorIcon || !errorMessage) return;

    let showError = false;
    let errorText = '';

    switch (field) {
    case 'firstName': {
        const validationResult = validateUsername(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error;
        break;
    }
    case 'lastName': {
        const validationResult = validateUsername(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error;
        break;
    }
    case 'username': {
        const validationResult = validateUsername(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error;
        break;
    }
    case 'birthday': {
        const validationResult = validateBirthday(value);
        showError = !validationResult.isValid;
        errorText = validationResult.error;
        break;
    }
    }

    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = errorText;
    
    const inputWrapper = target.closest('.input-wrapper');
    if (inputWrapper) {
        inputWrapper.classList.toggle('error', showError);
    }
    target.classList.toggle('error', showError);
};

export const debouncedProfileValidation = debounce(validateProfileField, 300);
