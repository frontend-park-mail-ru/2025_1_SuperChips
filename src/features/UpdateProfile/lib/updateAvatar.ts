import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';


export const updateAvatar = async (formData: FormData) => {
    const response = await API.post('/profile/avatar', formData);
    if (response instanceof Response && response.ok) {
        Toast('Фото профиля обновлено', 'message');
    } else if (response instanceof Response && response.status === 415) {
        Toast('Поддерживаются изображения в формате .png, .jpg, .jpeg', 'error');
    }

    return response;
};
