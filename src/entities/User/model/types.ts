export interface IUser {
    username: string,
    email: string,
    public_name: string,
    is_external: boolean,
    subscriber_count?: number,
    birthday?: Date,
    avatar?: string,
    about?: string,
}
