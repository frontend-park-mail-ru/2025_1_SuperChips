import type { INotification } from 'features/notification';
import { NotificationStorage } from 'features/notification';
import { checkAvatar, formatDateToReadable } from 'shared/utils';
import { navigate } from 'shared/router';
import './Notification.scss';
import template from './Notification.hbs';


export const Notification = async (item: INotification) => {
    const container = document.createElement('div');

    const ok = await checkAvatar(item.avatar);

    const config = {
        ...item,
        time: formatDateToReadable(item.timestamp),
        shortUsername: item.username[0].toUpperCase(),
        avatar: ok ? item.avatar : null,
    };

    if (config.time.split('.').length > 1) {
        config.time = config.time.split('.').pop() as string;
    }

    let content = '';

    switch (item.type) {
    case 'comment':
        content = `${item.username} оставил комментарий: ${item.comment}`;
        break;
    case 'like':
        content = `${item.username} оценил ваш flow`;
        break;
    case 'subscription':
        content = `${item.username} подписался на вас`;
        break;
    }

    container.innerHTML = template({ ...config, content:content });
    const notification = container.firstElementChild!;
    switch (item.type) {
    case 'comment':
    case 'like':
        notification.addEventListener('click', () => {
            navigate(`flow/${item.flow_id}`);
        });
        break;
    case 'subscription':
        notification.addEventListener('click', () => {
            navigate(`${item.username}`);
        });
        break;
    }

    const deleteButton = notification.querySelector('.notification__delete');
    deleteButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        notification.remove();
        NotificationStorage.removeNotification(item.id);
    });

    return notification;
};
