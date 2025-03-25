import { User } from 'entities/User';
import { showToast } from '../components/toast/toast';

interface ProfileFormData {
    [key: string]: string;
}

export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = document.querySelector<HTMLFormElement>('.settings-form');
    if (!form) return;

    const inputData: ProfileFormData = {};
    const inputs = form.querySelectorAll<HTMLInputElement>('.input__field');
    inputs.forEach(input => {
        if (input.id === 'birthday') {
            const date = new Date(input.value);
            inputData[input.id] = date.toISOString().split('T')[0];
        } else {
            inputData[input.id] = input.value;
        }
    });

    const textarea = form.querySelector<HTMLTextAreaElement>('#about');
    if (textarea) {
        inputData.about = textarea.value;
    }

    try {
        const response = await User.updateProfile(inputData);

        if (response.ok) {
            await User.fetchUserData();
            showToast('Профиль успешно обновлен', 'success');
        } else {
            showToast('Ошибка при обновлении профиля', 'error');
        }
    } catch (error) {
        showToast('Произошла ошибка', 'error');
    }
};