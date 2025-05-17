import { NotificationList } from 'widgets/NotificationList';
import { appState } from 'shared/router';
import { root } from 'app/app';

export const openNotificationList = () => {
    root.appendChild(NotificationList());
};
