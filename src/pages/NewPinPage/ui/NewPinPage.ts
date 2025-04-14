import { createPin } from '../handlers/createPin';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import { editPin } from '../handlers/editPin';
import { navigate } from 'shared/router';
import { API } from 'shared/api';
import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';
import { Auth } from '../../../features/authorization';

type TPinPageTypes = 'create' | 'edit';

export const NewPinPage = async (type: TPinPageTypes, pinID?: string) => {
    const page = document.createElement('div');

    const config = {
        create: type === 'create',
        edit: type === 'edit',
        header: type === 'create' ? 'Новый flow' : 'Изменение flow',
        url: '',
        input:
            {
                type: 'text',
                id: 'title',
                inputLabel: type === 'create' ? 'Название' : 'Новое название',
                errorMessage: '',
                maxlength: 128,
                transparent: true,
            },
    };

    if (pinID) {
        const response = await API.get(`/api/v1/flows?id=${pinID}`);
        if (response instanceof Error || !response.ok) {
            navigate('feed').finally();
            return page;
        }

        const body = await response.json();
        config.url = body.data.media_url;

        if (Auth.userData && body.data.author_username !== Auth.userData.username) {
            navigate('feed').finally();
            return page;
        }
    }


    page.innerHTML = NewPinTemplate(config);

    const form = page.querySelector('.new-pin-form');
    if (form) {
        const placeholder = form.querySelector('.input-placeholder');
        const newInput = Input(config.input);
        if (newInput) placeholder?.replaceWith(newInput);
    }


    const newPinForm = page.querySelector<HTMLFormElement>('.new-pin-form');
    const submitButton = page.querySelector('.create-flow-button');

    if (type === 'create') {
        submitButton?.addEventListener('click', createPin);
        newPinForm?.addEventListener('submit', createPin);
    } else if (type === 'edit' && pinID) {
        submitButton?.addEventListener('click', () => editPin(pinID));
        newPinForm?.addEventListener('submit', () => editPin(pinID));
    }


    const toggle = page.querySelector('.toggle-placeholder');
    const newToggle = Toggle('isPrivate');
    toggle?.replaceWith(newToggle);

    if (type === 'create') {
        const imageInput = ImageInput();
        newPinForm?.insertAdjacentElement('afterbegin', imageInput);
    } else if (type === 'edit') {
        const image = document.createElement('img');
        image.classList.add('edit-pin__image');
        image.src = config.url;
        newPinForm?.insertAdjacentElement('afterbegin', image);
    }

    return page;
};
