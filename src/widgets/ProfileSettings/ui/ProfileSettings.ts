import { handleProfileUpdate } from '../handlers/profileUpdate';
import { debouncedProfileValidation, validateProfileField } from '../handlers/profileValidation';
import { Auth } from 'features/authorization';
import profileTemplate from './ProfileSettings.hbs';
import { dateHandler, Input } from 'shared/components/input';
import { avatarUpdate } from '../handlers/avatarUpdate';


export const createProfileSettings = () => {
    const container = document.createElement('div');
    const userData = Auth.userData;
    if (!userData) return container;

    const fields = [
        {
            type: 'text',
            id: 'username',
            inputLabel: 'Никнейм',
            value: userData.username || '',
            errorMessage: 'Неверный формат никнейма',
            maxlength: 63,
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
    fileInput?.addEventListener('change', (event) => avatarUpdate(event));

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
            aboutTextarea.addEventListener('input', debouncedProfileValidation);
        }
    }

    const dateInput = document.querySelector<HTMLInputElement>('#birthday');
    dateInput?.addEventListener('input', dateHandler);

    form?.addEventListener('submit', handleProfileUpdate);

    const nickname = userData.public_name;
    const birthday = userData.birthday.toISOString().split('T')[0];

    const nicknameInput = container.querySelector<HTMLInputElement>('#username');
    if (nicknameInput) {
        nicknameInput.value = nickname;
    }

    const birthdayInput = container.querySelector<HTMLInputElement>('#birthday');
    if (birthdayInput) {
        birthdayInput.value = birthday;
    }

    return container;
};
