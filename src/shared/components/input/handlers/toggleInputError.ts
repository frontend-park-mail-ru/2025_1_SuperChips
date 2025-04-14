import { ValidationResult } from 'shared/validation';

/**
 * Toggles error state for input fields based on validation result
 * @param {HTMLElement} container - The input container element
 * @param {ValidationResult} result - The validation result
 */
export const toggleInputError = (container: Element | HTMLElement, result: ValidationResult): void => {
    const message = container.querySelector('.error-message');
    const icon = container.querySelector('.input__error');
    const input = container.querySelector<HTMLInputElement>('.input__field')
        || container.querySelector<HTMLInputElement>('.inputTransparent__field');


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
    }
};
