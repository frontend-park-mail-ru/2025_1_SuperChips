import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { root } from 'app/app';
import popupTemplate from '../ui/InvitePopup.hbs';

export const openInvitePopup = async (boardID: number) => {
    const popup = document.createElement('div');
    popup.innerHTML = popupTemplate({});

    const closeButton = popup.querySelector('.invite-popup__close-button');

    closeButton?.addEventListener('click', () => {
        popup.remove();
    });

    let link = await API.get(`/boards/${boardID}/invites`);

    if (!(link instanceof Response && link.ok)) {
        link = await API.post(`/boards/${boardID}/invites`);
    }

    if (!(link instanceof Response && link.ok)) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    const linkField = popup.querySelector('.invite-popup__link-input');
    if (!linkField) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    const body = await link.json();

    if (!body?.data?.links[0]) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }
    linkField.textContent = body.data.links[0].link;

    root.appendChild(popup);
};
