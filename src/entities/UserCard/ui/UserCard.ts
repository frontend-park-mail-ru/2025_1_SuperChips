import { pluralize } from 'shared/utils';
import { navigate } from 'shared/router';
import template from './UserCard.hbs';
import './UserCard.scss';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import { Toast } from 'shared/components/Toast';


export interface IUserCardProps {
    username: string;
    public_name: string;
    avatar: string | null;
    about: string;
    subscriber_count?: number;
    isSubscribed?: boolean;
    own?: boolean;
}

export const UserCard = (user: IUserCardProps) => {
    const container = document.createElement('div');
    container.classList.add('user-card');

    const displayName = user.public_name || user.username;
    const profileUrl = user.username;

    const subscriberCount = user?.subscriber_count ?? 0;

    const config = {
        username: displayName,
        avatar: user.avatar,
        about: user.about,
        shortUsername: displayName[0].toUpperCase(),
        subscribers: pluralize('подписчик', subscriberCount),
        isSubscribed: user.isSubscribed,
        own: user.own,
        isAuthenticated: !!Auth.userData // Add authentication status
    };

    container.innerHTML = template(config);

    const avatar = container.querySelector('.user-card__avatar');
    avatar?.addEventListener('click', () => navigate(profileUrl)); 

    const subscribeButton = container.querySelector('.user-card__subscribe-button');
    if (subscribeButton && Auth.userData?.username !== user.username) {
        subscribeButton.addEventListener('click', async () => {
            const subResponse = user.isSubscribed
                ? await API.delete('/subscription', { target_user: user.username })
                : await API.post('/subscription', { target_user: user.username });

            if (!(subResponse instanceof Response) || !subResponse.ok) {
                Toast('Не удалось выполнить действие', 'error');
            }

            user.isSubscribed = !user.isSubscribed;
            subscribeButton.textContent = user.isSubscribed ? 'Отписаться' : 'Подписаться';
            subscribeButton.classList.toggle('subscribed', user.isSubscribed);

            const subscribersElement = container.querySelector(`#${user.username}-subscribers`);
            if (subscribersElement && user.subscriber_count) {
                user.subscriber_count = (user.subscriber_count || 0) + (user.isSubscribed ? 1 : -1);
                subscribersElement.textContent = pluralize('подписчик', user.subscriber_count);
            }

            Toast(
                user.isSubscribed
                    ? `Вы подписались на ${user.public_name || user.username}`
                    : `Вы отписались от ${user.public_name || user.username}`,
                'success'
            );

            const counter = container.querySelector('.user-card__subscribers');
            if (counter) {
                const text = counter.textContent;
                if (text && text.split(' ').length > 1) {
                    const count = +text.split(' ')[0];
                    counter.textContent = pluralize('подписчик', count + 1 * (user.isSubscribed ? 1 : -1));
                }
            }
        });
    }

    // Add event listener for chat button
    const chatButton = container.querySelector('.user-card__chat-button');
    if (chatButton && Auth.userData?.username !== user.username) {
        chatButton.addEventListener('click', async () => {
            // Import required functions from ChatStorage
            const { ChatStorage } = await import('features/chat');
            const { openChatList } = await import('widgets/sidebar');
            const { Chat } = await import('widgets/Chat');

            // Open chat list first
            openChatList();

            // Check if chat already exists
            const chat = ChatStorage.getChatByUsername(user.username);
            let chatID;

            if (!chat) {
                // Create new chat if it doesn't exist
                chatID = await ChatStorage.newChat(user.username, user.avatar);
                if (!chatID) {
                    Toast('Не удалось создать чат', 'error');
                    return;
                }
            } else {
                chatID = chat.id;
            }

            // Open the chat
            Chat(chatID.toString());
        });
    }

    return container;
};
