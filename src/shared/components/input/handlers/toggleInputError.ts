import { ValidationResult } from 'shared/validation';

/**
 * Toggles error state for input fields based on validation result
 * @param {HTMLElement} container - The input container element
 * @param {ValidationResult} result - The validation result
 */
export const toggleInputError = (container: Element | HTMLElement, result: ValidationResult): void => {
    const message = container.querySelector('.error-message');
    const icon = container.querySelector('.input__error');
    const input = container.querySelector<HTMLInputElement>('.input__field');

    if (!message || !input || !icon) return;

    const valid = result.isValid;
    const error = result.error;

    const showError = !valid && (input.value !== '' || input.type === 'date');

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    input.classList.toggle('error', showError);
    message.textContent = error;

    const eye = container.querySelector<HTMLImageElement>('.input__toggle-password');
    if (eye) {
        eye.style.right = showError ? '36px' : '12px';
        
        // Position eye icon vertically centered
        eye.style.top = '50%';
        eye.style.transform = 'translateY(-50%)';
        
        // Set eye icon color based on state
        if (showError) {
            eye.classList.add('light-text');
            eye.style.filter = 'brightness(0) invert(1)'; // White for error state
        } else {
            eye.classList.add('light-text');
            eye.style.filter = 'opacity(0.5)'; // Match border color when not in error state
        }
    }
};
