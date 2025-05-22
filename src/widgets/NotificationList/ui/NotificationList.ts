import { Notification } from 'entities/Notification';
import { closeNotifications } from 'widgets/navbar/handlers/closeNotifications';
import { NotificationStorage } from 'features/notification';
import template from './NotificationList.hbs';
import './NotificationList.scss';


export const NotificationList = () => {
    const container = document.createElement('div');
    container.id = 'popup';

    const config = {
        hasNew: NotificationStorage.newNotifications.length > 0,
        hasOld: NotificationStorage.oldNotifications.length > 0,
    };

    container.innerHTML = template({ ...config, empty: !config.hasNew && !config.hasOld });

    const closeButton = container.querySelector<HTMLButtonElement>('.popup__close');
    closeButton?.addEventListener('click', closeNotifications);

    const readAll = container.querySelector('.notification__read-all');
    readAll?.addEventListener('click', () => NotificationStorage.markAllRead());

    if (!config.hasNew && !config.hasOld) {
        return container;
    }

    if (config.hasNew) {
        const newContainer = container.querySelector('#new-notifications');
        if (newContainer) {
            NotificationStorage.newNotifications.forEach(async (item) => {
                newContainer.appendChild(await Notification(item));
            });
        }
    }

    if (config.hasOld) {
        const newContainer = container.querySelector('#old-notifications');
        if (newContainer) {
            NotificationStorage.oldNotifications.forEach(async (item) => {
                newContainer.appendChild(await Notification(item));
            });
        }
    }

    return container;
};
