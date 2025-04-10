import { ErrorToast } from 'shared/components/errorToast';
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

    // Get all input fields
    const currentPasswordField = form.querySelector<HTMLInputElement>('#currentPassword');
    const newPasswordField = form.querySelector<HTMLInputElement>('#newPassword');
    const confirmPasswordField = form.querySelector<HTMLInputElement>('#confirmPassword');

    if (!currentPasswordField || !newPasswordField || !confirmPasswordField) return;

    // Validate current password
    if (!currentPasswordField.value) {
        const errorIcon = document.querySelector<HTMLElement>('#currentPassword-error-icon');
        const errorMessage = document.querySelector<HTMLElement>('#currentPassword-error');
        if (errorIcon && errorMessage) {
            errorIcon.classList.remove('hidden');
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Введите текущий пароль';
        }
        return;
    }

    // Validate new password
    const passwordValidation = validatePassword(newPasswordField.value);
    if (!passwordValidation.isValid) {
        const errorIcon = document.querySelector<HTMLElement>('#newPassword-error-icon');
        const errorMessage = document.querySelector<HTMLElement>('#newPassword-error');
        if (errorIcon && errorMessage) {
            errorIcon.classList.remove('hidden');
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = passwordValidation.error;
        }
        return;
    }

    // Validate password confirmation
    if (newPasswordField.value !== confirmPasswordField.value) {
        const errorIcon = document.querySelector<HTMLElement>('#confirmPassword-error-icon');
        const errorMessage = document.querySelector<HTMLElement>('#confirmPassword-error');
        if (errorIcon && errorMessage) {
            errorIcon.classList.remove('hidden');
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Пароли не совпадают';
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
