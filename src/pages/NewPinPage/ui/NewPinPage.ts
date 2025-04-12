import { submitHandler } from '../handlers/submitHandler';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';

export const NewPinPage = async () => {
    const page = document.createElement('div');

    const config = {
        header: 'Новый flow',
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

    const form = page.querySelector('.new-pin-form');
    if (form) {
        const placeholder = form.querySelector('.input-placeholder');
        const newInput = Input(config.input);
        if (newInput) placeholder?.replaceWith(newInput);
    }

    const newPinForm = page.querySelector<HTMLFormElement>('.new-pin-form');
    newPinForm?.addEventListener('submit', submitHandler);

    const imageInput = ImageInput();
    newPinForm?.insertAdjacentElement('afterbegin', imageInput);

    const submitButton = page.querySelector('.create-flow-button');
    submitButton?.addEventListener('click', submitHandler);

    const toggle = page.querySelector('.toggle-placeholder');
    const newToggle = Toggle('isPrivate');
    toggle?.replaceWith(newToggle);

    return page;
};
