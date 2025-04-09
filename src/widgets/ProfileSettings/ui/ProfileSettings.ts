import { ErrorToast } from 'shared/components/errorToast';
import { handleProfileUpdate } from '../handlers/profileUpdate';
import { validateProfileField } from '../handlers/profileValidation';
import { Auth } from 'features/authorization';
import profileTemplate from './ProfileSettings.hbs';
import { Input } from 'shared/components/input';

export const createProfileSettings = () => {
    const container = document.createElement('div');
    let userData = Auth.userData;
    if (!userData) return container;


    const fields = [
        {
            type: 'text',
            id: 'username',
            inputLabel: 'Никнейм',
            value: userData.username || '',
            errorMessage: 'Неверный формат никнейма',
            maxlength: 120,
            onInput: validateProfileField,
            transparent: true,
        },
        {
            type: 'date',
            id: 'birthday',
            inputLabel: 'Дата рождения',
            value: userData.birthday ? userData.birthday.toString() : '',
            errorMessage: 'Неверный формат даты',
            onInput: validateProfileField,
            transparent: true,
        }
    ];


    const templateData = {
        avatar: userData.avatar,
        username: userData.username,
        firstLetter: userData.username ? userData.username[0].toUpperCase() : '',
        about: userData.about || '',
        fields: fields
    };

    container.innerHTML = profileTemplate(templateData);

    const form = container.querySelector<HTMLFormElement>('.settings-form');
    const fileInput = container.querySelector<HTMLInputElement>('#avatar');
    
    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const formData = new FormData();
                formData.append('avatar', target.files[0]);
                try {
                    const response = await Auth.updateAvatar(formData);
                    if (response instanceof Response && response.ok) {
                        await Auth.fetchUserData();
                        userData = Auth.userData;
                        ErrorToast('Фото профиля обновлено');
                        window.location.reload();
                    } else if (response instanceof Response) {
                        await response.json();
                        ErrorToast('Ошибка при обновлении фото');
                    } else {
                        ErrorToast('Произошла ошибка');
                    }
                } catch (_error) {
                    ErrorToast('Произошла ошибка');
                }
            }
        });
    }
    
    const changePhotoButton = container.querySelector('.change-photo-button');
    if (changePhotoButton && fileInput) {
        changePhotoButton.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });
    }
    
    if (form) {
        fields.forEach(field => {
            const inputComponent = Input(field);
            if (inputComponent) {
                form.insertBefore(inputComponent, form.querySelector('.form-field'));
            }
        });
        
        const aboutTextarea = form.querySelector<HTMLTextAreaElement>('#about');
        if (aboutTextarea) {
            aboutTextarea.addEventListener('input', validateProfileField);
        }
    }

    form?.addEventListener('submit', handleProfileUpdate);

    return container;
};
