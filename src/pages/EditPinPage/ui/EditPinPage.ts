import { editPin } from '../handlers/editPin';
import { Toggle } from 'shared/components/toggle';
import { Input } from 'shared/components/input';
import { appState, navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { newPinPageTemplate } from 'pages/NewPinPage';
import { deletePin } from '../handlers/deletePin';
import './EditPinPage.scss';

export const EditPinPage = async (pinID: string) => {
    const page = document.createElement('div');

    const response = await API.get(`/flows?id=${pinID}`);
    if (response instanceof Error || !response.ok) {
        return null;
    }

    const pin = (await response.json()).data;

    if (Auth.userData && pin.author_username !== Auth.userData.username) {
        navigate('feed').finally();
        return page;
    }

    const config = {
        edit: true,
        header: 'Изменение flow',
        url: pin.media_url,
        description: pin.description,
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

    page.innerHTML = newPinPageTemplate(config);

    const placeholder = page.querySelector('.input-placeholder');
    placeholder?.replaceWith(Input(config.input));

    const newPinForm = page.querySelector<HTMLFormElement>('.new-pin-form');
    const submitButton = page.querySelector('.create-pin-button');
    newPinForm?.addEventListener('submit', () => editPin(pinID));
    submitButton?.addEventListener('click', () => editPin(pinID));

    const title = page?.querySelector<HTMLInputElement>('#title');
    if (title && pin.header) title.value = pin.header;

    const toggle = page.querySelector<HTMLInputElement>('.toggle-placeholder');
    const newToggle = Toggle('isPrivate');
    toggle?.replaceWith(newToggle);

    const checkbox = newToggle.querySelector<HTMLInputElement>('input');
    if (checkbox) checkbox.checked = pin.is_private;

    const deleteButton = page.querySelector('#delete-pin-button');
    deleteButton?.addEventListener('click', () => {
        deletePin(pinID);
    });

    return page;
};
