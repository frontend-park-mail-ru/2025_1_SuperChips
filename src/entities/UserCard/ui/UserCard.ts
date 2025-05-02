import type { IUser } from 'entities/User';
import { pluralize } from 'shared/utils';
import template from './UserCard.hbs';
import './UserCard.scss';

interface IUserCardProps {
    username: string;
    public_name: string;
    avatar: string | null;
    about: string;
    subscribers_count: number;
    isSubscribed?: boolean;
    email?: string; // Опциональное поле для совместимости с IUser
}

export const UserCard = (user: IUserCardProps) => {
    const container = document.createElement('div');
    container.classList.add('user-card');

    const config = {
        username: user.username,
        avatar: user.avatar,
        about: user.about,
        shortUsername: user.username[0].toUpperCase(),
        subscribers: pluralize('подписчик', user.subscribers_count || 0),
        isSubscribed: user.isSubscribed
    };

    container.innerHTML = template(config);
    return container;
};
