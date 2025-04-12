import { Toast } from 'shared/components/Toast';
import { formatDateToISO } from 'shared/utils';
import { API } from 'shared/api';

// Схема как в БД, но на странице есть только public_name, birthday и about
interface IProfileSettings {
    public_name?: string,
    birthday?: string,
    about?: string,
    username?: string,
    email?: string,
}

export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    const usernameInput = document.querySelector<HTMLInputElement>('#username');
    const birthdayInput = document.querySelector<HTMLInputElement>('#birthday');
    const aboutInput = document.querySelector<HTMLTextAreaElement>('#about');

    const payload: IProfileSettings = {};

    if (usernameInput && usernameInput.value !== '') {
        payload.public_name = usernameInput.value;
    }

    if (birthdayInput && birthdayInput.value !== '') {
        const birthday = birthdayInput.value;
        payload.birthday = formatDateToISO(birthday);
    }

    if (aboutInput && aboutInput.value !== '') {
        payload.about = aboutInput.value;
    }

    const response = await API.patch('/api/v1/profile/update', payload);

    if (response instanceof Response && response.ok) {
        Toast('Профиль успешно обновлен', 'message');
    }
};
