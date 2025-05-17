import type { INotification } from 'features/notification';
import { checkAvatar, formatDateToReadable } from 'shared/utils';
import { navigate } from 'shared/router';
import './Notification.scss';
import template from './Notification.hbs';


export const Notification = async (item: INotification) => {
    const container = document.createElement('div');

    // todo
    // const ok = await checkAvatar(item.avatar);
    const ok = 1;

    const config = {
        ...item,
        time: formatDateToReadable(item.timestamp),
        shortUsername: item.username[0].toUpperCase(),
        avatar: ok ? item.avatar : null,
        isComment: item.type === 'comment',
        isFollower: item.type === 'follower',
        isLike: item.type === 'like',
    };

    let content = '';

    switch (item.type) {
    case 'comment':
        content = `${item.username} оставил комментарий: ${item.comment}`;
        break;
    case 'like':
        content = `${item.username} оценил ваш flow`;
        break;
    case 'follower':
        content = `${item.username} подписался на вас`;
        break;
    }

    container.innerHTML = template({ ...config, content:content });

    switch (item.type) {
    case 'comment':
    case 'like':
        container.addEventListener('click', () => { navigate(`flow/${item.flow_id}`);});
        break;
    case 'follower':
        container.addEventListener('click', () => { navigate(`${item.username}`);});
        break;
    }


    return container;
};
