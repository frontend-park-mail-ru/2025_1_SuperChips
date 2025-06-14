import { PinDropdown } from 'widgets/PinDropdown';
import { likeHandler } from '../handlers/likeHandler';
import { savePinToBoard } from 'entities/Pin';
import { sharePin } from '../handlers/sharePin';
import { openSharing } from 'widgets/Sharing';
import { appState, navigate } from 'shared/router';
import { checkAvatar } from 'shared/utils';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import { BoardStorage } from 'features/boardLoader';
import { commentHandler } from 'widgets/Comments';
import './PinPage.scss';
import template from './PinPage.hbs';


export const PinPage = async (pinID: string, boardID: string | null = null) => {
    const container = document.createElement('div');
    container.classList.add('one-pin-page-wrapper');

    const URI = boardID ? `/boards/${boardID}/flows/${pinID}` : `/flows?id=${pinID}`;
    const pinRequest = await API.get(URI);

    if (pinRequest instanceof Error || !pinRequest.ok) {
        return null;
    }
    const pinData = (await pinRequest.json()).data;

    const authorRequest = await API.get(`/users/${pinData.author_username}`);
    if (authorRequest instanceof Error || !authorRequest.ok) {
        return null;
    }
    const userData = (await authorRequest.json()).data;
    const ok = await checkAvatar(userData?.avatar);

    const config = {
        ...pinData,
        authorized: !!Auth.userData,
        author_pfp: ok ? userData?.avatar : null,
        shortUsername: userData?.username[0].toUpperCase(),
        author: userData?.username,
        username: userData?.public_name,
        hasText: !!pinData.header || !!pinData.description,
        own: userData.username === Auth.userData?.username,
        boardToSave: BoardStorage.getBoardToSave(),
        mobile: appState.mobile,
    };
    


    container.innerHTML = template(config);



    const dropdownButton = container.querySelector('#dropdown-button');
    dropdownButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        PinDropdown(config.pinID);
    });

    const likeButton = container.querySelector<HTMLImageElement>('#like');
    likeButton?.parentElement?.addEventListener('click', () => likeHandler(pinID));

    const saveButton = container.querySelector('.save-button');
    saveButton?.addEventListener('click', () => savePinToBoard(pinID));

    const name = container.querySelector<HTMLDivElement>('.one-pin__author-area__pfp');
    const pfp = container.querySelector<HTMLDivElement>('.one-pin__author-area__tag');
    name?.addEventListener('click', () => navigate(config.author));
    pfp?.addEventListener('click', () => navigate(config.author));

    const editButton = container.querySelector('#edit-pin');
    editButton?.addEventListener('click', () => navigate(`flow/edit/${pinID}`, true).finally());

    const shareButton = container.querySelector('#share');

    appState.sharing.id = pinID;
    if (appState.mobile) {
        shareButton?.addEventListener('click', () => sharePin(pinID));
    } else {
        shareButton?.addEventListener('click', () => openSharing());
    }

    // Add comments section
    const commentsContainer = container.querySelector('#comments-container');
    if (commentsContainer) {
        const comments = await commentHandler(pinID);
        if (comments) {
            commentsContainer.innerHTML = '';
            commentsContainer.appendChild(comments);
        }
    }

    return container;
};
