import { appState } from 'shared/router';
import { openNotifications } from './openNotifications';

export const closeNotifications = () => {
    if (!appState.notification.open) return;

    const notificationList = document.querySelector('.notification-container');
    notificationList?.remove();

    const notificationButton = document?.querySelector('.navbar__notification');

    notificationButton?.removeEventListener('click', closeNotifications);
    notificationButton?.addEventListener('click', openNotifications);

    appState.notification.open = false;
};
