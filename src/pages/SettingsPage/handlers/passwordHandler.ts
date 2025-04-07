import { ErrorToast } from 'shared/components/errorToast';
import { appState } from 'shared/router';
import { IPasswordFormData } from 'shared/types/ProfileFormData';
import { Auth } from 'features/authorization';
import { validatePassword } from 'shared/validation';

/**
 * Handles password update form submission
 * @param {SubmitEvent} event - The form submission event
 */
export const handlePasswordUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const passwordData: IPasswordFormData = {
        currentPassword: formData.get('currentPassword') as string,
        newPassword: formData.get('newPassword') as string
    };

    // Validate password strength
    const newPassword = passwordData.newPassword;
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
        const passwordInput = form.querySelector<HTMLInputElement>('#newPassword');
        const message = form.querySelector('#newPassword-error');
        const icon = form.querySelector('#newPassword-error-icon');
        const eye = form.querySelector<HTMLImageElement>('#newPassword-eye');
        
        if (message && icon && eye && passwordInput) {
            icon.classList.remove('hidden');
            message.classList.remove('hidden');
            passwordInput.classList.add('error');
            message.textContent = passwordValidation.error;
            eye.style.right = '36px';
            eye.style.filter = 'brightness(1.5)';
        }
        return;
    }
    
    // Validate that passwords match
    const confirmPassword = formData.get('confirmPassword') as string;
    if (passwordData.newPassword !== confirmPassword) {
        const confirmInput = form.querySelector<HTMLInputElement>('#confirmPassword');
        const message = form.querySelector('#confirmPassword-error');
        const icon = form.querySelector('#confirmPassword-error-icon');
        const eye = form.querySelector<HTMLImageElement>('#confirmPassword-eye');
        
        if (message && icon && eye && confirmInput) {
            icon.classList.remove('hidden');
            message.classList.remove('hidden');
            confirmInput.classList.add('error');
            message.textContent = 'Пароли не совпадают';
            eye.style.right = '36px';
            eye.style.filter = 'brightness(1.5)';
        }
        return;
    }

    try {
        const response = await Auth.updatePassword(passwordData);
        if (response instanceof Response && response.ok) {
            ErrorToast('Пароль успешно изменен');
            form.reset();
        } else if (response instanceof Response) {
            const errorData = await response.json();
            ErrorToast(errorData.message || 'Ошибка при изменении пароля');
        } else {
            ErrorToast('Ошибка при изменении пароля');
        }
    } catch (_error) {
        ErrorToast('Произошла ошибка при изменении пароля');
    }
};
