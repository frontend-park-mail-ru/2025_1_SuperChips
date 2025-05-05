import { pluralize } from 'shared/utils';
import { navigate } from 'shared/router';
import template from './UserCard.hbs';
import './UserCard.scss';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import { Toast } from 'shared/components/Toast';


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

    const displayName = user.public_name || user.username;
    const profileUrl = user.username; 

    const config = {
        username: displayName,
        avatar: user.avatar,
        about: user.about,
        shortUsername: displayName[0].toUpperCase(),
        subscribers: pluralize('подписчик', user.subscribers_count || 0),
        isSubscribed: user.isSubscribed,
        own: user.own
    };

    container.innerHTML = template(config);

    const avatar = container.querySelector('.user-card__avatar');
    avatar?.addEventListener('click', () => navigate(profileUrl)); 

    const subscribeButton = container.querySelector('.user-card__subscribe-button');
    if (subscribeButton && Auth.userData?.username !== user.username) {
        subscribeButton.addEventListener('click', async () => {
            try {
                const subResponse = user.isSubscribed
                    ? await API.delete('/subscription', { target_user: user.username })
                    : await API.post('/subscription', { target_user: user.username });

                if (!(subResponse instanceof Response) || !subResponse.ok) {
                    throw new Error('Subscription action failed');
                }

                user.isSubscribed = !user.isSubscribed;
                subscribeButton.textContent = user.isSubscribed ? 'Отписаться' : 'Подписаться';
                subscribeButton.classList.toggle('subscribed', user.isSubscribed);

                const subscribersElement = container.querySelector(`#${user.username}-subscribers`);
                if (subscribersElement) {
                    const newCount = (user.subscribers_count || 0) + (user.isSubscribed ? 1 : -1);
                    user.subscribers_count = newCount;
                    subscribersElement.textContent = pluralize('подписчик', newCount);
                }

                Toast(
                    user.isSubscribed 
                        ? `Вы подписались на ${user.public_name || user.username}` 
                        : `Вы отписались от ${user.public_name || user.username}`,
                    'success'
                );
            } catch {
                Toast('Не удалось выполнить действие', 'error');
            }
        });
    }

    return container;
};
