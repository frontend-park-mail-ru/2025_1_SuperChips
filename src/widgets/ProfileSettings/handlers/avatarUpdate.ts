import { Toast } from 'shared/components/Toast';
import { Navbar } from 'widgets/navbar';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';

export const avatarUpdate = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files[0]) return;

    const formData = new FormData();
    formData.append('image', target.files[0]);

    const response = await API.post('/api/v1/profile/avatar', formData);
    if (response instanceof Response && response.ok) {
        Toast('Фото профиля обновлено', 'message');

        const pfp = document.querySelector<HTMLImageElement>('#pfp');
        if (pfp) {
            const body = await response.json();
            pfp.src = body.data.media_url;
            if (Auth.userData) {
                Auth.userData.avatar = pfp.src;
            }
        }
        await Navbar();
    } else if (response instanceof Response && response.status === 415) {
        Toast('Поддерживаются изображения в формате .png, .jpg, .jpeg', 'error');
    }
};
