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
        const body = await response.json();
        const pfp = document.querySelector<HTMLImageElement>('#pfp');
        if (pfp) {
            pfp.src = body.data.media_url;
        } else {
            const pfpContainer = document.querySelector<HTMLDivElement>('.settings-profile-picture');
            if (pfpContainer) {
                pfpContainer.innerHTML = `<img src="${body.data.media_url}" alt="Profile picture" id="pfp">`;
            }
        }
        if (Auth.userData) {
            Auth.userData.avatar = body.data.media_url;
        }
        await Navbar();
    }
};
