export interface IUser {
    uid: number | null,
    username: string | null,
    avatar: string | null,
    publicName: string | null,
    email: string | null,
    birthday: Date | null,
    about: string | null,
}

export interface IUserData extends IUser {
    authorized: boolean | null,
    tag: string | null,
    firstName?: string | null,
    lastName?: string | null,
    shortUsername?: string | null,
}
