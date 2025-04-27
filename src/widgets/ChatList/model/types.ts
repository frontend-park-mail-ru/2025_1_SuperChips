export interface IMessage {
    sender: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export interface IChat {
    username: string;
    avatar: string;
    last_message: IMessage;
    count: number;
    id: string;
}
