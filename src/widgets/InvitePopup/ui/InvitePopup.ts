import { createNewLink } from '../handlers/createNewLink';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { root } from 'app/app';
import { BoardSettingsState } from 'widgets/BoardSettings';
import popupTemplate from './InvitePopup.hbs';
import './InvitePopup.scss';


export const InvitePopup = async (boardID: number) => {
    if (BoardSettingsState.createMenuOpen) return;
    BoardSettingsState.createMenuOpen = true;

    const popup = document.createElement('div');
    popup.innerHTML = popupTemplate({});

    const advancedToggle = popup.querySelector('.invite-popup__advanced-toggle');
    const settingsSection = popup.querySelector<HTMLElement>('.invite-popup__settings');
    const createButton = popup.querySelector('#create-link-button');

    advancedToggle?.addEventListener('click', () => {
        advancedToggle.classList.toggle('active');
        if (settingsSection) {
            settingsSection.style.display = settingsSection.style.display === 'none' ? 'block' : 'none';
        }
    });

    const response = await API.get(`/boards/${boardID}/invites`);
    let inviteId = '';

    if ((response instanceof Response && response.ok)) {
        const body = await response.json();
        if (body.data?.links?.length > 0) {
            inviteId = body.data.links[0]?.link;
        }
    }

    const link = `${window.location.origin}/invite/${inviteId}`;
    const linkField = popup.querySelector('#invite-link');
    if (linkField && inviteId) {
        linkField.textContent = link;
    }

    linkField?.addEventListener('click', () => {
        const linkField = popup.querySelector<HTMLDivElement>('#invite-link');
        const link = linkField ? linkField.textContent : null;

        if (link) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    Toast('Ссылка скопирована', 'success');
                })
                .catch(() => {
                    Toast('Не удалось скопировать ссылку', 'error');
                });
        }
    });

    createButton?.addEventListener('click', () => {
        createNewLink(boardID);
    });

    const close = (e: Event) => {
        e.stopPropagation();
        if (!popup.contains(e.target as Node)) {
            popup.remove();
            document.removeEventListener('click', close);
            BoardSettingsState.createMenuOpen = false;
        }
    };
    document.addEventListener('click', close);

    const closeButton = popup.querySelector('.invite-popup__close-button');
    closeButton?.addEventListener('click', () => {
        document.removeEventListener('click', close);
        BoardSettingsState.createMenuOpen = false;
        popup.remove();
    });

    root.appendChild(popup);
};
