import type { IUser } from 'entities/User';
import { pluralize } from 'shared/utils';
import { navigate } from 'shared/router';
import template from './UserCard.hbs';
import './UserCard.scss';

interface IUserCardProps {
    username: string;
    public_name: string;
    avatar: string | null;
    about: string;
    subscribers_count: number;
    isSubscribed?: boolean;
    own?: boolean;
}

export const UserCard = (user: IUserCardProps) => {
    const container = document.createElement('div');
    container.classList.add('user-card');

    const config = {
        username: user.public_name || user.username,
        avatar: user.avatar,
        about: user.about,
        shortUsername: (user.public_name || user.username)[0].toUpperCase(),
        subscribers: pluralize('подписчик', user.subscribers_count || 0),
        isSubscribed: user.isSubscribed,
        own: user.own
    };

    container.innerHTML = template(config);

    const avatar = container.querySelector('.user-card__avatar');
    avatar?.addEventListener('click', () => {
        navigate(`/${user.username}`);
    });

    return container;
};