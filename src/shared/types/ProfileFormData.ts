export interface IProfileFormData {
    firstName: string;
    lastName: string;
    username: string;
    birthDate: string;
    about: string;
}

export interface IPasswordFormData {
    currentPassword: string;
    newPassword: string;
}

export interface IApiResponse<T> {
    ok: boolean;
    data: T;
    error?: string;
}
