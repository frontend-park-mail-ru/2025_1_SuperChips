import { NotificationList } from 'widgets/NotificationList';
import { root } from 'app/app';
import { appState } from 'shared/router';
import { closeNotifications } from './closeNotifications';

export const openNotifications = () => {
    if (appState.notification.open) return;

    root.appendChild(NotificationList());
    appState.notification.open = true;

    const notificationButton = document?.querySelector('.navbar__notification');
    notificationButton?.removeEventListener('click', openNotifications);
    notificationButton?.addEventListener('click', closeNotifications);
};
