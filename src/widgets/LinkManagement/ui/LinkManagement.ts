import { formatDateToReadable } from 'shared/utils';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import './LinkManagement.scss';
import template from './LinkManagement.hbs';


interface ILinkModel {
    link: string,
    names?: string[],
    time_limit?: string,
    usage_limit?: number,
    usage_count?: number,
}

interface ILinkProps extends ILinkModel {
    id: string,
    exceeded: boolean,
    expired: boolean,
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
                usage_limit: item.usage_limit && item.usage_count,
                exceeded: (item.usage_limit && item.usage_count) && (item.usage_count >= item.usage_limit),
                expired: item.time_limit ? new Date > new Date(item.time_limit) : null,
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


    popup.innerHTML += template(config);

    popup.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('invitation-link__delete-button')) return;

        const id = target.id;

        const response = await API.delete(`/boards/${boardID}/invites/${id}`);

        if (!(response instanceof Response && response.ok)) {
            Toast('Ошибка при удалении ссылки');
            return;
        } else if (response instanceof Response && response.ok) {
            Toast('Ссылка успешно удалена', 'success');
            target.closest('.invitation-link')?.remove();
            if (document.querySelectorAll('.invitation-link').length === 0) {
                popup.insertAdjacentHTML('beforeend', '<div>У вас нет активных приглашений</div>');
            }
            return;
        } else {
            // todo remove
            Toast('Окак', 'message');
        }
    });

    const close = (e: Event) => {
        if (!popup.contains(e.target as Node)) {
            popup.remove();
            document.removeEventListener('click', close);
        }
    };
    document.addEventListener('click', close);

    const closeButton = popup.querySelector('.popup__close');
    closeButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove();
    });

    return popup;
};

