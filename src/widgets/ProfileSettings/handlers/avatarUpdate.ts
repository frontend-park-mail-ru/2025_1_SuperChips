import { Navbar } from 'widgets/navbar';
import { updateAvatar } from 'features/UpdateProfile';
import { Auth } from 'features/authorization';


export const avatarUpdate = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || !target.files[0]) return;

    const formData = new FormData();
    formData.append('image', target.files[0]);

    const response = await updateAvatar(formData);

    if (response instanceof Response && response.ok) {
        const pfp = document.querySelector<HTMLImageElement>('#pfp');
        if (pfp) {
            const body = await response.json();
            pfp.src = body.data.media_url;
            if (Auth.userData) {
                Auth.userData.avatar = pfp.src;
            }
        }
        await Navbar();
    }
};
