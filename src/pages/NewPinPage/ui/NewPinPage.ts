import { createPin } from '../handlers/createPin';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';


export const NewPinPage = async () => {
    const page = document.createElement('div');

    const config = {
        create: true,
        header: 'Новый flow',
        url: '',
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
    newPinForm?.addEventListener('submit', createPin);
    newPinForm?.insertAdjacentElement('afterbegin', ImageInput());

    const submitButton = page.querySelector('.create-flow-button');
    submitButton?.addEventListener('click', createPin);

    const toggle = page.querySelector('.toggle-placeholder');
    toggle?.replaceWith(Toggle('isPrivate'));

    return page;
};
