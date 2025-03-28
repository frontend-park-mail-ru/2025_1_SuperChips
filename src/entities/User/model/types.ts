export interface IUserData {
    username: string | null,
    email: string | null,
    birthday: Date | null,
}

export interface IUser extends IUserData {
    authorized: boolean | null,
    tag: string | null,
    avatar?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    about?: string | null,
    shortUsername?: string | null,
}
