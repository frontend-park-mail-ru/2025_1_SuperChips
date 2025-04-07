import { validatePassword } from 'shared/validation';

/**
 * Handles password field validation during input
 * @param {Event} event - The input event
 */
export const passwordConfirmHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    
    // Handle password validation
    if (target.id === 'newPassword') {
        validateNewPassword(target);
    }
    
    // Handle confirm password validation
    if (target.id === 'confirmPassword') {
        validateConfirmPassword();
    }
};

/**
 * Validates the new password field
 * @param {HTMLInputElement} target - The password input element
 */
export const validateNewPassword = (target: HTMLInputElement): void => {
    const password = target.value;
    const message = document.querySelector('#newPassword-error');
    const icon = document.querySelector('#newPassword-error-icon');
    const eye = document.querySelector<HTMLImageElement>('#newPassword-eye');
    
    if (!message || !icon || !eye) return;
    
    const result = validatePassword(password);
    const showError = !result.isValid && password !== '';
    
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    message.textContent = result.error;
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
    
    // Add error class to input field for red border
    const inputField = document.querySelector<HTMLInputElement>('#newPassword');
    if (inputField) {
        inputField.classList.toggle('error', showError);
    }
    
    // Also update confirm password validation if it has a value
    const confirmInput = document.querySelector<HTMLInputElement>('#confirmPassword');
    if (confirmInput && confirmInput.value) {
        validateConfirmPassword();
    }
};

/**
 * Validates the confirm password field
 */
export const validateConfirmPassword = (): void => {
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
    
    // Position eye icon vertically centered
    eye.style.top = '50%';
    eye.style.transform = 'translateY(-50%)';
    
    // Set eye icon color based on state
    if (showError) {
        eye.classList.add('light-text');
        eye.style.filter = 'brightness(0) invert(1)'; // White for error state
    } else {
        eye.classList.add('light-text');
        eye.style.filter = 'opacity(0.5)'; 
    }
    
    const inputField = document.querySelector<HTMLInputElement>('#confirmPassword');
    if (inputField && typeof showError === 'boolean') {
        inputField.classList.toggle('error', showError);
    }
};