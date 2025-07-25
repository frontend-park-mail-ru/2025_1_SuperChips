import { formatDateToReadable } from 'shared/utils';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardSettingsState } from 'widgets/BoardSettings';
import './LinkManagement.scss';
import template from './LinkManagement.hbs';
import { OneLink } from './OneLink';


interface ILinkModel {
    link: string,
    names?: string[],
    time_limit?: string,
    usage_limit?: number,
    usage_count?: number,
}

export interface ILinkProps extends ILinkModel {
    id: string,
    exceeded: boolean,
    expired: boolean,
    boardID: number,
}


export const LinkManagement = async (boardID: number) => {
    const popup = document.createElement('div');
    popup.className = 'link-management';
    popup.id = 'popup';

    const response = await API.get(`/boards/${boardID}/invites`);

    if (response instanceof Response && response.status === 404) {
        Toast('У вас нет активных приглашений', 'message');
        return;
    }
    if (!(response instanceof Response && response.ok)) {
        Toast('Ошибка при получении приглашений');
        return;
    }

    const body = await response.json();

    if (body?.data?.links.length === 0) return;

    const config = {
        links: body.data.links.reverse().map((item: ILinkModel) => {
            return {
                ...item,
                id: item.link,
                link: `${window.location.origin}/invite/${item.link}`,
                time_limit: item.time_limit ? formatDateToReadable(item.time_limit) : null,
                has_usage_limit: !!item.usage_limit,
                exceeded: (item.usage_limit && item.usage_count) && (item.usage_count >= item.usage_limit),
                expired: item.time_limit ? new Date > new Date(item.time_limit) : null,
                boardID: boardID,
            };
        })
    };

    const autoDelete = config.links.filter((item: ILinkProps) => item.exceeded || item.expired);
    if (autoDelete.length > 0) {
        autoDelete.forEach((item: ILinkProps) => {
            API.delete(`/boards/${boardID}/invites/${item.id}`).finally();
        });
    }

    const needRender = config.links.some((item: ILinkProps) => !item.exceeded && !item.expired);

    if (!needRender) {
        Toast('У вас нет активных приглашений', 'message');
        return;
    }

    BoardSettingsState.invitesOpen = true;
    popup.innerHTML += template(config);

    config.links.forEach((item: ILinkProps) => {
        popup.appendChild(OneLink(item));
    });

    const close = (e: Event) => {
        e.stopPropagation();
        if (!popup.contains(e.target as Node)) {
            popup.remove();
            document.removeEventListener('click', close);
            BoardSettingsState.invitesOpen = false;
        }
    };
    document.addEventListener('click', close);

    const closeButton = popup.querySelector('.popup__close');
    closeButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.removeEventListener('click', close);
        popup.remove();
        BoardSettingsState.invitesOpen = false;
    });


    return popup;
};

