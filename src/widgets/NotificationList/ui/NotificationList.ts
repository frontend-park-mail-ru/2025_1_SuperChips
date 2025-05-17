import { Notification } from 'entities/Notification';
import { closePopup } from 'widgets/BoardPopup';
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

    if (!config.hasNew && !config.hasOld) {
        container.innerHTML = template({ empty: true });
        return container;
    }
    container.innerHTML = template(config);
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

    container.addEventListener('click', closePopup);

    return container;
};
