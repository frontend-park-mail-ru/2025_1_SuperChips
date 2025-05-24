import { openNotifications } from './openNotifications';
import { appState } from 'shared/router';
import { NotificationStorage } from 'features/notification';

export const closeNotifications = () => {
    if (!appState.notification.open) return;

    const notificationList = document.querySelector('.notification-container');
    notificationList?.remove();

    const notificationButton = document?.querySelector('.navbar__notification');

    if (notificationButton) {
        notificationButton.removeEventListener('click', closeNotifications);
        notificationButton.addEventListener('click', openNotifications);
        notificationButton.classList.remove('active');
    }

    NotificationStorage.updateSaved();

    appState.notification.open = false;
};
