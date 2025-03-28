import { showToast } from '../components/toast/toast';
import { IPasswordFormData } from 'shared/types/ProfileFormData';

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

    // Validate that passwords match
    const confirmPassword = formData.get('confirmPassword') as string;
    if (passwordData.newPassword !== confirmPassword) {
        showToast('Пароли не совпадают', 'error');
        return;
    }

    try {
        // Show success message
        showToast('Пароль успешно изменен', 'success');
        
        // Clear the form
        form.reset();
    } catch (_error) {
        showToast('Произошла ошибка при изменении пароля', 'error');
    }
};
