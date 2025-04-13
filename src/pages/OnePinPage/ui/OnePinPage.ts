import { PinDropdown } from 'widgets/PinDropdown';
import { likeHandler } from '../handlers/likeHandler';
import { savePinToBoard } from 'entities/Pin';
import { navigate } from 'shared/router';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import './OnePinPage.scss';
import template from './OnePinPage.hbs';


export const OnePinPage = async (pinID: string) => {
    const container = document.createElement('div');
    container.classList.add('one-pin-page-wrapper');

    const pinRequest = await API.get(`/api/v1/flows?id=${pinID}`);
    if (pinRequest instanceof Error || !pinRequest.ok) {
        navigate('feed').finally();
        return container;
    }
    const pinData = (await pinRequest.json()).data;

    const authorRequest = await API.get(`/api/v1/users/${pinData.author_username}`);
    if (authorRequest instanceof Error || !authorRequest.ok) {
        navigate('feed').finally();
        return container;
    }
    const userData = (await authorRequest.json()).data;

    const config = {
        ...pinData,
        authorized: !!Auth.userData,
        author_pfp: userData?.avatar,
        shortUsername: userData?.username[0].toUpperCase(),
        author: userData?.username,
        username: userData?.public_name,
    };

    container.innerHTML = template(config);

    const dropdownButton = container.querySelector<HTMLImageElement>('#dropdown-button');
    dropdownButton?.addEventListener('click', () => {
        PinDropdown(pinID);
    });

    const likeButton = container.querySelector<HTMLImageElement>('#like');
    likeButton?.addEventListener('click', () => likeHandler(pinID));

    const saveButton = container.querySelector('.save-button');
    saveButton?.addEventListener('click', () => savePinToBoard(pinID));

    const name = container.querySelector<HTMLDivElement>('.one-pin__author-area__pfp');
    const pfp = container.querySelector<HTMLDivElement>('.one-pin__author-area__tag');
    name?.addEventListener('click', () => navigate(config.author));
    pfp?.addEventListener('click', () => navigate(config.author));

    return container;
};
