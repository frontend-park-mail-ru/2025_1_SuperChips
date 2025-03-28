import { User } from 'entities/User';
import { showToast } from '../components/toast/toast';
import { formatDateToISO } from 'shared/utils';

export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const profileData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        username: formData.get('username') as string,
        birthDate: formatDateToISO(formData.get('birthday') as string),
        about: formData.get('about') as string
    };

    try {
        const response = await User.updateProfile(profileData);
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
        showToast('Произошла ошибка при обновлении профиля', 'error');
    }
};
