import { closePopup } from 'widgets/BoardPopup';
import { VKIDRegisterHandler } from '../handlers/VKIDRegisterHandler';
import { debouncedVKIDButtonHandler } from '../handlers/VKIDUsernameValidation';
import { Input } from 'shared/components/input';
import { root } from 'app/app';
import { appState } from 'shared/router';
import template from './VKIDPopup.hbs';
import './VKIDPopup.scss';

export const VKIDPopup = (accessToken: string) => {
    if (appState.isShowingPopup) return;
    appState.isShowingPopup = true;

    const container = document.querySelector('.signup-page')
        || document.querySelector('.login-page');
    if (!container) return;

    const popup = document.createElement('div');
    popup.innerHTML = template({});

    root.appendChild(popup);

    const newInput = Input({
        type: 'text',
        id: 'VKID-username',
        inputLabel: 'Имя пользователя',
        errorMessage: 'Пользователь с таким именем уже существует',
        maxlength: 32,
        required: true,
    });

    popup.querySelector('.input-placeholder')?.replaceWith(newInput);

    setTimeout(() => {
        document.addEventListener('click', closePopup);
    }, 0);
    document.addEventListener('keydown', closePopup);

    const submitButton = popup.querySelector<HTMLButtonElement>('.VKID-popup__button');
    submitButton?.addEventListener('click', () => VKIDRegisterHandler(accessToken));

    const form = popup.querySelector<HTMLFormElement>('#username-form');
    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        VKIDRegisterHandler(accessToken).finally();
    });
    form?.addEventListener('input', debouncedVKIDButtonHandler);
};
