import { closePopup } from 'widgets/BoardPopup';
import { VKIDRegisterHandler } from '../handlers/VKIDRegisterHandler';
import { Input } from 'shared/components/input';
import { root } from 'app/app';
import { appState } from 'shared/router';
import template from './VKIDPopup.hbs';
import './VKIDPopup.scss';
import { VKIDUsernameValidation, VKIDValidation } from '../handlers/VKIDUsernameValidation';


export const VKIDPopup = (accessToken: string, status: number) => {
    if (appState.isShowingPopup) return;
    appState.isShowingPopup = true;

    const container = document.querySelector('.signup-page')
        || document.querySelector('.login-page');
    if (!container) return;

    const popup = document.createElement('div');
    popup.innerHTML = template({ second: status === 418 });
    root.appendChild(popup);

    if (status === 418) {
        const emailInput = Input({
            type: 'text',
            id: 'VKID-email',
            inputLabel: 'email',
            errorMessage: 'Почта или имя уже заняты',
            maxlength: 64,
            required: true,
        });
        popup.querySelector('.input-placeholder')?.replaceWith(emailInput);
    }

    const usernameInput = Input({
        type: 'text',
        id: 'VKID-username',
        inputLabel: 'Имя пользователя',
        errorMessage: 'Почта или имя уже заняты',
        maxlength: 32,
        required: true,
    });

    popup.querySelector('.input-placeholder')?.replaceWith(usernameInput);

    setTimeout(() => {
        document.addEventListener('click', closePopup);
    }, 0);
    document.addEventListener('keydown', closePopup);

    const submitButton = popup.querySelector<HTMLButtonElement>('.VKID-popup__button');
    submitButton?.addEventListener('click', () => VKIDRegisterHandler(accessToken, status));

    const form = popup.querySelector<HTMLFormElement>('#username-form');
    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        VKIDRegisterHandler(accessToken, status).finally();
    });

    if (status === 418) {
        form?.addEventListener('input', VKIDValidation);
    } else {
        form?.addEventListener('input', VKIDUsernameValidation);
    }
};
