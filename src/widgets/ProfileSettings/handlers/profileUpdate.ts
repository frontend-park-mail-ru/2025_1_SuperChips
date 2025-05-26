import { formatDateToISO } from 'shared/utils';
import { updateProfileData } from 'features/UpdateProfile';
import { Toast } from 'shared/components/Toast';
import { Auth } from 'features/authorization';


export interface IProfileSettings {
    public_name?: string,
    birthday?: string,
    about?: string,
}


export const handleProfileUpdate = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    const usernameInput = document.querySelector<HTMLInputElement>('#username');
    const birthdayInput = document.querySelector<HTMLInputElement>('#birthday');
    const aboutInput = document.querySelector<HTMLTextAreaElement>('#about');

    const payload: IProfileSettings = {};

    if (usernameInput && usernameInput.value !== '') {
        payload.public_name = usernameInput.value.trim();
    }

    if (birthdayInput && birthdayInput.value !== '') {
        const birthday = birthdayInput.value.trim();
        payload.birthday = formatDateToISO(birthday);
    }

    if (aboutInput && aboutInput.value !== '') {
        payload.about = aboutInput.value.trim();
    }

    const birthday = new Date(payload.birthday as string);
    if (birthday.getTime() === Auth.userData?.birthday?.getTime()
        && payload.about === Auth.userData?.about
        && payload.public_name === Auth.userData?.public_name
    ) {
        Toast('Нет изменений', 'message');
        return;
    }

    await updateProfileData(payload);
};
