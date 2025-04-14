import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';

/**
 * Handles password update form submission
 * @param {SubmitEvent} event - The form submission event
 */
export const handlePasswordUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    // Get all input fields
    const currentPasswordField = form.querySelector<HTMLInputElement>('#currentPassword');
    const newPasswordField = form.querySelector<HTMLInputElement>('#newPassword');
    const confirmPasswordField = form.querySelector<HTMLInputElement>('#confirmPassword');

    if (!currentPasswordField || !newPasswordField || !confirmPasswordField) return;

    const payload = {
        old_password: currentPasswordField.value.trim(),
        new_password: newPasswordField.value.trim(),
    };

    const response = await API.post('/api/v1/profile/password', payload);
    if (response instanceof Response) {
        if (response.ok) {
            Toast('Пароль успешно изменен', 'message');
            form.reset();
            const button = document.querySelector<HTMLButtonElement>('.submit-button');
            if (button) button.disabled = true;
        } else if (response.status === 401) {
            Toast('Неправильный старый пароль', 'error', 5000);
        }
    }
};
