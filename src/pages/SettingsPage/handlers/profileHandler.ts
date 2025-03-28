import { User } from 'entities/User';
import { showToast } from '../components/toast/toast';
import { IProfileFormData } from 'shared/types/ProfileFormData';

export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = document.querySelector<HTMLFormElement>('.settings-form');
    if (!form) return;

    const inputData: IProfileFormData = {} as IProfileFormData;
    const inputs = form.querySelectorAll<HTMLInputElement>('.input__field');
    inputs.forEach(input => {
        if (input.id === 'birthday') {
            const date = new Date(input.value);
            inputData.birthDate = date.toISOString().split('T')[0];
        } else if (input.id === 'firstName' || input.id === 'lastName' || input.id === 'username') {
            inputData[input.id] = input.value;
        }
    });

    const textarea = form.querySelector<HTMLTextAreaElement>('#about');
    if (textarea) {
        inputData.about = textarea.value;
    }

    try {
        const response = await User.updateProfile(inputData);

        if (response instanceof Response && response.ok) {
            await User.fetchUserData();
            showToast('Профиль успешно обновлен', 'success');
        } else if (response instanceof Response) {
            const errorData = await response.json();
            showToast(errorData.message || 'Ошибка при обновлении профиля', 'error');
        } else {
            showToast('Ошибка при обновлении профиля', 'error');
        }
    } catch (_error) {
        showToast('Произошла ошибка', 'error');
    }
};
