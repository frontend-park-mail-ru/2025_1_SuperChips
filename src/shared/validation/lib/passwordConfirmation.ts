import { ValidationResult } from 'shared/types/ValidationResult';

export const validatePasswordConfirm = (
    confirm: string
): ValidationResult => {
    // Check for both possible password field IDs (for login/signup and settings pages)
    const newPasswordField: HTMLInputElement | null = document.querySelector('#newPassword');
    const passwordField: HTMLInputElement | null = document.querySelector('#password');
    
    // Use newPassword field if available (settings page), otherwise use password field (signup page)
    const password = newPasswordField?.value || passwordField?.value;

    if (!password || password !== confirm) {
        return { isValid: false, error: 'Пароли не совпадают' };
    }
    return { isValid: true, error: '' };
};
