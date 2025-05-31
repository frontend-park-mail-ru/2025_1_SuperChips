import { WEBSOCKET_URL } from 'shared/config/constants';
import { NotificationStorage } from 'features/notification';
import { ChatStorage } from 'features/chat';
// import { API } from 'shared/api';
// import { checkAvatar } from 'shared/utils';


class WSInstance {
    ws: WebSocket;

    constructor() {
        this.ws = new WebSocket(WEBSOCKET_URL);
        this.initWS();
    }

    initWS() {
        this.ws.onmessage = async (event: MessageEvent) => {
            try {
                const body = JSON.parse(event.data);
                if (body.type === 'message') {
                    ChatStorage.getMessage(body.content.sender, {
                        ...body.content,
                        username: body.content.recipient,
                        id: body.content.message_id.toString(),
                        timestamp: new Date(body.content.timestamp),
                    }).finally();
                } else if (body.type === 'notification') {
                    // if (!body.content.username.includes('https://sun1-97.userapi.com')) {
                    //     if (!body.content.username.includes('https://yourflow.ru/static/avatars')) {
                    //         body.content.username = 'https://yourflow.ru/static/avatars' + body.content.username;
                    //     }
                    // }
                    NotificationStorage.getNotification({
                        id: body.content.id.toString(),
                        timestamp: new Date(body.content.created_at),
                        username: body.content.sender,
                        avatar: body.content.sender_avatar,
                        flow_id: body.content.additional_data?.pin_id?.toString(),
                        type: body.content.type,
                        is_read: body.content.is_read,
                    });
                }
            } catch {
                /**/
            }
        };
    }

    reconnect() {
        this.ws.close();
        this.ws = new WebSocket(WEBSOCKET_URL);
        this.initWS();
    }

    close() {
        this.ws.close();
    }

    send(payload: string) {
        this.ws.send(payload);
    }
}

export const WS = new WSInstance();
