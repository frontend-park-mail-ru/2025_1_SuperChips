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
        const oldNotifications = localStorage.getItem('oldNotifications');
        if (oldNotifications) {
            const arr = JSON.parse(oldNotifications);
            arr.forEach((notification: INotification) => {
                this.oldNotifications.push(notification);
            });
        }

        const response = await API.get('/notifications');
        if (!(response instanceof Response && response.ok)) return;

        const body = await response.json();
        if (!body.data) return;

        body.data.forEach((notification: INotificationModel) => {
            if (!this.oldNotifications.find((item) => item.id === notification.id.toString())) {
                this.newNotifications.push({
                    id: notification.id.toString(),
                    timestamp: new Date(notification.created_at),
                    username: notification.sender,
                    avatar: notification.sender_avatar,
                    flow_id: notification.additional_data?.pin_id?.toString(),
                    type: notification.type,
                    is_read: notification.is_read,
                });
            }
        });

        if (this.newNotifications.length > 0) {
            const notificationButton = document?.querySelector('.navbar__notification');
            notificationButton?.classList.add('unread');
        }
    }

    getNotification(notification: INotification) {
        this.newNotifications.unshift(notification);
        const notificationButton = document?.querySelector('.navbar__notification');
        notificationButton?.classList.add('unread');
    }

    removeNotification(notificationID: string) {
        this.newNotifications = this.newNotifications.filter((notification) => notification.id !== notificationID);
        this.oldNotifications = this.oldNotifications.filter((notification) => notification.id !== notificationID);
        this.updateSaved();
    }

    markAllRead() {
        this.newNotifications.forEach(item => {
            this.oldNotifications.push({
                ...item,
                is_read: true,
            });
            this.deleteFromDB(item.id);
        });
        this.newNotifications = [];

        this.updateSaved();
        this.updateIcon();
        const newSubheader = document.querySelector('#new-notifications-subheader');
        if (newSubheader) {
            newSubheader.textContent = 'Прочитанные';
        }
        document.querySelector('#old-notifications-subheader')?.remove();
        document.querySelector('.notification__read-all')?.remove();
    }

    read(id: string) {
        const notification = this.newNotifications.find((item) => item.id === id);
        if (notification) {
            this.newNotifications = this.newNotifications.filter((notification) => notification.id !== id);
            this.oldNotifications.push(notification);
            this.deleteFromDB(id);
        }
        if (this.newNotifications.length === 0) {
            this.updateIcon();
            this.updateSaved();
        }
    }

    deleteFromDB(id: string) {
        WS.send(JSON.stringify({
            type: 'delete_notification',
            content: {
                id: +id,
            }
        }));
    }

    updateIcon() {
        const notificationButton = document?.querySelector('.navbar__notification');
        notificationButton?.classList.remove('unread');
    }

    updateSaved() {
        if (this.oldNotifications.length > 0) {
            const save: INotification[] = [];
            const seen = new Set;
            this.oldNotifications.forEach((notification) => {
                if (!seen.has(notification.id)) {
                    seen.add(notification.id);
                    save.push(notification);
                }
            });
            this.sortNotifications();
            localStorage.setItem('oldNotifications', JSON.stringify(save));
        } else {
            localStorage.setItem('oldNotifications', '');
        }
    }

    sortNotifications() {
        if (!this.oldNotifications[0]) return;
        this.oldNotifications.sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    }
}

export const NotificationStorage = new notificationStorage();
