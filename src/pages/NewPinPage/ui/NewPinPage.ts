import { submitHandler } from '../handlers/submitHandler';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from 'shared/components/input';
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

    const newPinForm = page.querySelector('.new-pin-form');
    const imageInput = ImageInput();
    newPinForm?.insertAdjacentElement('afterbegin', imageInput);

    const submitButton = page.querySelector('.create-flow-button');
    submitButton?.addEventListener('click', submitHandler);

    return page;
};
