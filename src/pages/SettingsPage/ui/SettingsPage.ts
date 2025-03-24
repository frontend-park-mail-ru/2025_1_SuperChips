import { User } from 'entities/User';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { createVertTabBar } from 'pages/SettingsPage/components/vert-tab-bar/vert-tab-bar';
import { InputTransparent } from 'shared/components/inputTransparent';
import './settings.scss';

const mockUserData = {
    avatar: null,
    firstName: 'Иван',
    lastName: 'Иванов',
    username: 'ivanov',
    birthDate: '2000-01-01',
    about: 'Привет! Я Иван.'
};

const createProfileSettings = () => {
    const container = document.createElement('div');
    container.classList.add('settings-content');

    const header = document.createElement('h2');
    header.textContent = 'Настройки профиля';
    header.classList.add('settings-header');
    container.appendChild(header);

    const form = document.createElement('form');
    form.classList.add('settings-form');

    const fields = [
        { type: 'text', id: 'firstName', inputLabel: 'Имя', value: mockUserData.firstName, errorMessage: 'Введите имя', maxlength: 120, required: true },
        { type: 'text', id: 'lastName', inputLabel: 'Фамилия', value: mockUserData.lastName, errorMessage: 'Введите фамилию', maxlength: 120, required: true },
        { type: 'text', id: 'username', inputLabel: 'Никнейм', value: mockUserData.username, errorMessage: 'Неверный формат никнейма', maxlength: 120, required: true },
        { type: 'date', id: 'birthday', inputLabel: 'Дата рождения', value: mockUserData.birthDate, errorMessage: 'Неверный формат даты', required: true }
    ];

    // Create avatar container
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('avatar-container');

    const avatarWrapper = document.createElement('div');
    avatarWrapper.classList.add('profile-picture');

    if (mockUserData.avatar) {
        const avatarImg = document.createElement('img');
        avatarImg.src = mockUserData.avatar;
        avatarImg.alt = 'Profile picture';
        avatarWrapper.appendChild(avatarImg);
    } else {
        const shortUsername = document.createElement('p');
        shortUsername.classList.add('shortUsername');
        shortUsername.textContent = mockUserData.username[0].toUpperCase();
        avatarWrapper.appendChild(shortUsername);
    }

    const changePhotoButton = document.createElement('button');
    changePhotoButton.classList.add('change-photo-button');
    changePhotoButton.textContent = 'Изменить фото';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'avatar';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    changePhotoButton.addEventListener('click', () => {
        fileInput.click();
    });

    avatarContainer.appendChild(avatarWrapper);
    avatarContainer.appendChild(changePhotoButton);
    avatarContainer.appendChild(fileInput);

    form.insertBefore(avatarContainer, form.firstChild);

    fields.forEach(field => {
        const inputComponent = InputTransparent(field);
        form.appendChild(inputComponent);
    });

    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('form-field');
    const label = document.createElement('label');
    label.setAttribute('for', 'about');
    label.textContent = 'О себе';
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'about');
    textarea.value = mockUserData.about || '';
    textarea.maxLength = 500;
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(textarea);
    form.appendChild(fieldContainer);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Сохранить изменения';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Изменения сохранены (заглушка)');
    });

    container.appendChild(form);
    return container;
};

import { debouncedPasswordValidation } from '../handlers/passwordValidation';

const createSecuritySettings = () => {
    const container = document.createElement('div');
    container.classList.add('settings-content');

    const header = document.createElement('h2');
    header.textContent = 'Настройки безопасности';
    header.classList.add('settings-header');
    container.appendChild(header);

    const form = document.createElement('form');
    form.classList.add('settings-form');

    const fields = [
        { type: 'password', id: 'currentPassword', inputLabel: 'Текущий пароль', errorMessage: 'Введите текущий пароль', maxlength: 120 },
        { type: 'password', id: 'newPassword', inputLabel: 'Новый пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', maxlength: 120 },
        { type: 'password', id: 'confirmPassword', inputLabel: 'Подтвердите новый пароль', errorMessage: 'Пароли не совпадают', maxlength: 120 }
    ];

    fields.forEach(field => {
        const inputComponent = InputTransparent(field);
        form.appendChild(inputComponent);
        
        if (field.id === 'newPassword' || field.id === 'confirmPassword') {
            const input = inputComponent.querySelector('input');
            if (input) {
                input.addEventListener('input', debouncedPasswordValidation);
            }
        }
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Изменить пароль';
    submitButton.classList.add('submit-button');
    form.appendChild(submitButton);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Пароль изменен (заглушка)');
    });

    container.appendChild(form);
    return container;
};

export const SettingsPage = async () => {
    const page = document.createElement('div');
    page.classList.add('settings-page');

    page.appendChild(await Navbar());
    page.appendChild(await Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('settings-container');

    const tabs = [
        { id: 'profile', title: 'Профиль', active: true },
        { id: 'security', title: 'Безопасность', active: false }
    ];

    const tabBar = createVertTabBar(tabs, (tabId: string) => {
        const contentContainer = mainContent.querySelector('.settings-content-container');
        if (contentContainer) {
            contentContainer.remove();
        }

        let newContentContainer = document.createElement('div');
        newContentContainer.classList.add('settings-content-container');

        if (tabId === 'profile') {
            newContentContainer.appendChild(createProfileSettings());
        } else if (tabId === 'security') {
            newContentContainer.appendChild(createSecuritySettings());
        }

        mainContent.appendChild(newContentContainer);
    });

    mainContent.appendChild(tabBar);

    const initialContent = document.createElement('div');
    initialContent.classList.add('settings-content-container');
    initialContent.appendChild(createProfileSettings());
    mainContent.appendChild(initialContent);

    page.appendChild(mainContent);

    return page;
};