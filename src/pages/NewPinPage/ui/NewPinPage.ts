import { createPin } from '../handlers/createPin';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import { appState } from 'shared/router';
import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';


export const NewPinPage = async () => {
    const page = document.createElement('div');

    const config = {
        create: true,
        header: 'Новый flow',
        url: '',
        mobile: appState.mobile,
        input:
            {
                type: 'text',
                id: 'title',
                inputLabel: 'Название',
                errorMessage: '',
                maxlength: 128,
                transparent: true,
            },
    };

    page.innerHTML = NewPinTemplate(config);

    const placeholder = page.querySelector('.input-placeholder');
    placeholder?.replaceWith(Input(config.input));

    const newPinForm = page.querySelector<HTMLFormElement>('.new-pin-form');
    newPinForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        createPin();
    });

    const imageInput = ImageInput();
    if (appState.mobile) {
        const form = page.querySelector('.description-box_form');
        const container = page.querySelector('#description-wrapper');
        container?.insertBefore(imageInput, form);
    } else {
        newPinForm?.insertAdjacentElement('afterbegin', imageInput);
    }
    const submitButton = page.querySelector('.create-pin-button');
    submitButton?.addEventListener('click', createPin);

    const toggle = page.querySelector('.toggle-placeholder');
    toggle?.replaceWith(Toggle('isPrivate'));

    document.querySelector('#newPin')?.classList.add('active');

    return page;
};
