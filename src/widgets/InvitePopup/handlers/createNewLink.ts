import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';

const errorMessage = 'Ошибка при создании новой ссылки';

export const createNewLink = async (boardID: number) => {
    const popup = document.querySelector('.invite-popup');
    const linkField = popup?.querySelector('.invite-popup__link-input');

    if (!popup || !linkField) return;

    const timeLimit = (popup.querySelector('#time-limit') as HTMLSelectElement)?.value;
    const usageLimit = (popup.querySelector('#usage-limit') as HTMLSelectElement)?.value;

    const params: Record<string, number | string> = {};

    if (timeLimit && timeLimit !== 'never') {
        const days = parseInt(timeLimit.replace('d', ''));
        if (!isNaN(days)) {
            const today = new Date();
            today.setDate(today.getDate() + days);
            params.time_limit = today.toISOString();
        }
    }

    if (usageLimit && usageLimit !== '0') {
        params.usage_limit = parseInt(usageLimit);
    }

    const newResponse = await API.post(`/boards/${boardID}/invites`, params);

    if (!(newResponse instanceof Response && newResponse.ok)) {
        Toast(errorMessage);
        return;
    }

    const newBody = await newResponse.json();

    if (!newBody?.data) {
        Toast(errorMessage);
        return;
    }

    const newInviteId = newBody.data.link || newBody.data.links?.[0]?.link;
    if (!newInviteId) {
        Toast(errorMessage);
        return;
    }

    const newFullInviteLink = `${window.location.origin}/invite/${newInviteId}`;
    if (linkField) {
        linkField.textContent = newFullInviteLink;
        Toast('Новая ссылка создана', 'success');

        const copyButton = popup.querySelector<HTMLButtonElement>('#copy-button');
        if (copyButton) {
            copyButton.disabled = false;
        }
        return;
    }
};
