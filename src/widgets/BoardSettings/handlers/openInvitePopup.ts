import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { root } from 'app/app';
import popupTemplate from '../ui/InvitePopup.hbs';

export const openInvitePopup = async (boardID: number) => {
    const popup = document.createElement('div');
    popup.innerHTML = popupTemplate({});

    const closeButton = popup.querySelector('.invite-popup__close-button');
    const advancedToggle = popup.querySelector('.invite-popup__advanced-toggle');
    const settingsSection = popup.querySelector<HTMLElement>('.invite-popup__settings');
    const createButton = popup.querySelector('#create-link-button');

    advancedToggle?.addEventListener('click', () => {
        advancedToggle.classList.toggle('active');
        if (settingsSection) {
            settingsSection.style.display = settingsSection.style.display === 'none' ? 'block' : 'none';
        }
    });

    closeButton?.addEventListener('click', () => {
        popup.remove();
    });

    let response = await API.get(`/boards/${boardID}/invites`);

    if (!(response instanceof Response && response.ok)) {
        response = await API.post(`/boards/${boardID}/invites`);
    }

    if (!(response instanceof Response && response.ok)) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    let body;
    try {
        body = await response.json();
    } catch (error) {
        Toast('Ошибка при обработке ответа сервера', 'error');
        return;
    }

    const linkField = popup.querySelector('#invite-link');
    if (!linkField) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    if (!body?.data) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    const inviteId = body.data.link || body.data.links?.[0]?.link;
    if (!inviteId) {
        Toast('Ошибка при получении пригласительной ссылки, попробуйте позже', 'error');
        return;
    }

    const fullInviteLink = `${window.location.origin}/invite/${inviteId}`;
    linkField.textContent = fullInviteLink;
    
    const copyButton = popup.querySelector('#copy-button');
    copyButton?.addEventListener('click', () => {
        navigator.clipboard.writeText(fullInviteLink)
            .then(() => {
                Toast('Ссылка скопирована', 'success');
            })
            .catch(() => {
                Toast('Не удалось скопировать ссылку', 'error');
            });
    });

    createButton?.addEventListener('click', async () => {
        const timeLimit = (popup.querySelector('#time-limit') as HTMLSelectElement)?.value;
        const usageLimit = (popup.querySelector('#usage-limit') as HTMLSelectElement)?.value;
        const usernames = (popup.querySelector('#usernames') as HTMLInputElement)?.value;

        const params: Record<string, any> = {};
        
        if (timeLimit && timeLimit !== 'never') {
            const days = parseInt(timeLimit.replace('d', ''));
            if (!isNaN(days)) {
                params.time_limit = days;
            }
        }
        
        if (usageLimit && usageLimit !== '0') {
            params.usage_limit = parseInt(usageLimit);
        }
        
        if (usernames) {
            const usernamesArray = usernames.split(',').map(name => name.trim()).filter(Boolean);
            if (usernamesArray.length > 0) {
                params.usernames = usernamesArray;
            }
        }

        try {
            const newResponse = await API.post(`/boards/${boardID}/invites`, params);

            if (!(newResponse instanceof Response && newResponse.ok)) {
                throw new Error('Ошибка при создании новой ссылки');
            }

            const newBody = await newResponse.json();

            if (!newBody?.data) {
                throw new Error('Неверный формат ответа');
            }

            const newInviteId = newBody.data.link || newBody.data.links?.[0]?.link;
            if (!newInviteId) {
                throw new Error('Ссылка не найдена в ответе');
            }

            const newFullInviteLink = `${window.location.origin}/invite/${newInviteId}`;
            linkField.textContent = newFullInviteLink;
            Toast('Новая ссылка создана', 'success');
        } catch (error) {
            Toast(error instanceof Error ? error.message : 'Ошибка при создании новой ссылки', 'error');
        }
    });

    root.appendChild(popup);
};
