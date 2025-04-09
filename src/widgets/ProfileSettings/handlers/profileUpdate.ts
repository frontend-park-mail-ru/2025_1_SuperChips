import { ErrorToast } from 'shared/components/errorToast';
import { Auth } from 'features/authorization';

export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const profileData = {
        email: Auth.userData?.email || '',
        username: formData.get('username') as string,
        public_username: formData.get('username') as string,
        birthday: new Date(formData.get('birthday') as string),
        about: formData.get('about') as string,
    };


    try {
        const response = await Auth.updateProfile(profileData);
        if (response instanceof Response && response.ok) {
            await Auth.fetchUserData();
            ErrorToast('Профиль успешно обновлен');
        } else if (response instanceof Response) {
            const errorData = await response.json();
            ErrorToast(errorData.message || 'Ошибка при обновлении профиля');
        } else {
            ErrorToast('Ошибка при обновлении профиля');
        }
    } catch (_error) {
        ErrorToast('Произошла ошибка при обновлении профиля');
    }
};
