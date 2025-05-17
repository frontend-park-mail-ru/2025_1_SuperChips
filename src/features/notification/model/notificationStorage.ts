// import { API } from 'shared/api';


export type TNotificationType = 'like' | 'comment' | 'follower';

export interface INotification {
    timestamp: Date,
    type: TNotificationType,
    username: string,
    public_name: string,
    avatar: string,
    flow_id?: string,
    comment?: string,
}


class notificationStorage {
    newNotifications: INotification[] = [];
    oldNotifications: INotification[] = [];

    async fetchNotifications() {
        // const response = await API.get('/notifications?type=new');
        // if (!(response instanceof Response && response.ok)) return;

        // const body = await response.json();
        // if (!body.data) return;

        // todo remove
        const newMock: INotification[] = [
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'comment',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date('2020-2-14'),
                flow_id: '996',
                comment: 'bibaboba',
            },
            {
                username: 'valekir',
                type: 'follower',
                public_name: 'valekir',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date,
            },
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'like',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date('2025-5-15'),
                flow_id: '996',
            },
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'comment',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date('2020-2-14'),
                flow_id: '996',
                comment: 'bibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibabobabibaboba',
            },
            {
                username: 'valekir',
                type: 'follower',
                public_name: 'valekir',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date,
            },
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'like',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date('2025-5-15'),
                flow_id: '996',
            },
        ];
        const oldMock: INotification[] =  [
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'comment',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date,
                flow_id: '996',
                comment: 'bibaboba',
            },
            {
                username: 'valekir',
                type: 'follower',
                public_name: 'valekir',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date(),
            },
            {
                username: 'valekir',
                public_name: 'valekir',
                type: 'like',
                avatar: 'https://yourflow.ru/static/img/b0324834-163f-4257-8534-cd684d5b27ff.png',
                timestamp: new Date,
                flow_id: '996',
            },
        ];

        newMock.forEach(item => this.newNotifications.push(item));
        oldMock.forEach(item => this.oldNotifications.push(item));
    }
}

export const NotificationStorage = new notificationStorage();
