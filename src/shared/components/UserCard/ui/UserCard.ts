import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';
import UserCardTemplate from './UserCard.hbs';
import './UserCard.scss';

interface IUserCardProps {
    username: string;
    public_name: string;
    avatar: string | null;
    isSubscribed: boolean;
    own: boolean;
}

export const UserCard = (props: IUserCardProps): HTMLDivElement => {
    const page = document.createElement('div');
    page.innerHTML = UserCardTemplate(props);

    const subscribeButton = page.querySelector('.user-card__subscribe-button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', async () => {
            try {
                const method = props.isSubscribed ? 'delete' : 'post';
                const response = await API[method]('/subscription', {
                    target_user: props.username
                });

                if (response instanceof Error) {
                    Toast('Произошла ошибка при изменении подписки', 'error');
                    return;
                }

                if (!response.ok) {
                    if (response.status === 404) {
                        Toast('Пользователь не найден', 'error');
                    } else {
                        Toast('Произошла ошибка при изменении подписки', 'error');
                    }
                    return;
                }

                const body = await response.json();
                const isSubscribed = body.data.isSubscribed;
                
                subscribeButton.textContent = isSubscribed ? 'Отписаться' : 'Подписаться';
                subscribeButton.classList.toggle('subscribed', isSubscribed);
                
                // Обновляем состояние в родительском компоненте
                props.isSubscribed = isSubscribed;
            } catch {
                Toast('Произошла ошибка', 'error');
            }
        });
    }

    return page.firstChild as HTMLDivElement;
}; 
