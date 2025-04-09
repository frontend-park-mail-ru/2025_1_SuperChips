import { validatePassword } from 'shared/validation';
import { toggleInputError } from 'shared/components/input';

/**
 * Handles password field validation during input
 * @param {Event} event - The input event
 */
export const passwordConfirmHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    
    if (target.id === 'newPassword') {
        validateNewPassword(target);
    }
    
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
    const container = document.querySelector('.input-container');
    if (!container) return;
    
    const result = validatePassword(password);
    
    toggleInputError(container, result);
    
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
    const container = document.querySelector<HTMLElement>('#confirmPassword')?.closest('.input-container');
    
    if (!container) return;
    
    const result = {
        isValid: !(password && confirm && password !== confirm),
        error: 'Пароли не совпадают'
    };
    
    toggleInputError(container, result);
};
