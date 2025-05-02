import type { IUser } from 'entities/User';
import { pluralize } from 'shared/utils';
import template from './UserCard.hbs';
import './UserCard.scss';

export const UserCard = (user: IUser) => {
    const container = document.createElement('div');
    container.classList.add('user-card');

    const config = {
        username: user.username,
        avatar: user.avatar,
        about: user.about,
        shortUsername: user.username[0].toUpperCase(),
        subscribers: pluralize('подписчик', user.subscriber_count ?? 0),
    };


    container.innerHTML = template(config);
    return container;
};
