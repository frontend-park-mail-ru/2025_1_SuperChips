import { API } from 'shared/api';
import { WS } from 'features/webSocket';

export type TNotificationType = 'like' | 'comment' | 'subscription';

export interface INotification {
    id: string,
    timestamp: Date,
    type: TNotificationType,
    username: string,
    is_read: boolean
    avatar: string,
    flow_id?: string,
    comment?: string,
}

interface INotificationModel {
    id: number,
    type: TNotificationType,
    created_at: string,
    sender: string,
    sender_avatar: string,
    receiver: string,
    is_read: boolean,
    additional_data?: {
        pin_id?: number,
        comment?: string,
    }
}


class notificationStorage {
    newNotifications: INotification[] = [];
    oldNotifications: INotification[] = [];

    async fetchNotifications() {
        const response = await API.get('/notifications');
        if (!(response instanceof Response && response.ok)) return;

        const body = await response.json();
        if (!body.data) return;

        body.data.forEach((notification: INotificationModel) => {
            this.newNotifications.push({
                id: notification.id.toString(),
                timestamp: new Date(notification.created_at),
                username: notification.sender,
                avatar: notification.sender_avatar,
                flow_id: notification.additional_data?.pin_id?.toString(),
                type: notification.type,
                is_read: notification.is_read,
            });
        });
    }

    getNotification(notification: INotification) {
        this.newNotifications.unshift(notification);
    }

    removeNotification(notificationID: string, old: boolean) {
        if (!old) {
            this.newNotifications = this.newNotifications.filter((notification) => notification.id !== notificationID);
        } else if (old) {
            this.oldNotifications = this.oldNotifications.filter((notification) => notification.id !== notificationID);
        }
        WS.send(JSON.stringify({
            type: 'delete_notification',
            content: {
                id: +notificationID,
            }
        }));
    }

    markAllRead() {
        this.newNotifications.forEach(item => {
            this.oldNotifications.push({
                ...item,
                is_read: true,
            });
        });
        this.newNotifications = [];

        const newSubheader = document.querySelector('#new-notifications-subheader');
        if (newSubheader) {
            newSubheader.textContent = 'Прочитанные';
        }
        document.querySelector('#old-notifications-subheader')?.remove();
    }
}

export const NotificationStorage = new notificationStorage();
