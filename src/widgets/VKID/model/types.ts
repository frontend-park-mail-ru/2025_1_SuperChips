export interface IVKIDLogin {
    access_token: string,
}

export interface IVKIDRegister extends IVKIDLogin {
    username: string,
}
