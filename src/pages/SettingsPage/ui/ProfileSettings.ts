import { User } from 'entities/User';
import { InputTransparent } from 'shared/components/inputTransparent';
import { showToast } from '../components/toast/toast';
import { handleProfileUpdate } from '../handlers/profileUpdate';
import { validateProfileField } from '../handlers/profileValidation';
import profileTemplate from './ProfileSettings.hbs';

let userData = User.getUserData();

export const createProfileSettings = () => {
    const container = document.createElement('div');

    const fields = [
        { type: 'text', id: 'firstName', inputLabel: 'Имя', value: userData.firstName || '', errorMessage: 'Введите имя', maxlength: 120, required: true, onInput: validateProfileField },
        { type: 'text', id: 'lastName', inputLabel: 'Фамилия', value: userData.lastName || '', errorMessage: 'Введите фамилию', maxlength: 120, required: true, onInput: validateProfileField },
        { type: 'text', id: 'username', inputLabel: 'Никнейм', value: userData.username || '', errorMessage: 'Неверный формат никнейма', maxlength: 120, required: true, onInput: validateProfileField },
        { type: 'date', id: 'birthday', inputLabel: 'Дата рождения', value: userData.birthDate || '', errorMessage: 'Неверный формат даты', required: true, onInput: validateProfileField }
    ];
    
    const templateData = {
        avatar: userData.avatar,
        username: userData.username,
        firstLetter: userData.username ? userData.username[0].toUpperCase() : '',
        about: userData.about || '',
        fields: fields
    };
    
    container.innerHTML = profileTemplate(templateData);
    
    const form = container.querySelector('.settings-form');
    const fileInput = container.querySelector('#avatar');
    
    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const formData = new FormData();
                formData.append('avatar', target.files[0]);
                try {
                    const response = await User.updateAvatar(formData);
                    if (response instanceof Response && response.ok) {
                        await User.fetchUserData();
                        userData = User.getUserData();
                        showToast('Фото профиля обновлено', 'success');
                        window.location.reload();
                    } else if (response instanceof Response) {
                        await response.json();
                        showToast('Ошибка при обновлении фото', 'error');
                    } else {
                        showToast('Произошла ошибка', 'error');
                    }
                } catch (_error) {
                    showToast('Произошла ошибка', 'error');
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
            const inputComponent = InputTransparent(field);
            if (inputComponent) {
                form.insertBefore(inputComponent, form.querySelector('.form-field'));
            }
        });
    }

    if (form) {
        form.addEventListener('submit', handleProfileUpdate);
    }

    return container;
};