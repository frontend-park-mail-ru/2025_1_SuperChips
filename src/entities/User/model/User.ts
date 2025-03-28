import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';
import { IUserData } from './types';
import { ErrorToast } from 'shared/components/errorToast';

class user {
    #userData: IUserData;

    constructor() {
        this.#userData = {
            authorized: false,
            uid: null,
            publicName: null,
            username: null,
            tag: null,
            avatar: null,
            firstName: null,
            lastName: null,
            birthday: null,
            about: null,
            email: null,
        };
    }

    fetchUserData = async (): Promise<void> => {
        const response = await Auth.getUserData();

        if (response instanceof Error) {
            ErrorToast('Ошибка при получении данных. Попробуйте еще раз');
            return;
        }

        if (response.ok) {
            const body = await response.json();
            const data = body.data;

            this.#userData = {
                ...data,
                birthday: new Date(data.birthday),
                shortUsername: data.username[0].toUpperCase(),
                authorized: true,
            };
        }
    };

    updateProfile = async (profileData: {
        firstName: string;
        lastName: string;
        username: string;
        birthDate: string;
        about: string;
    }) => {
        return await API.put('/api/v1/user/profile', profileData);
    };

    updatePassword = async (passwords: {
        currentPassword: string;
        newPassword: string;
    }) => {
        return await API.put('/api/v1/user/password', passwords);
    };

    updateAvatar = async (formData: FormData) => {
        return await API.put('/api/v1/user/avatar', formData);
    };

    clearUserData = () => {
        Object.keys(this.#userData).forEach((item: string) => {
            const key = item as keyof IUserData;
            this.#userData[key] = null;
        });
    };

    getUserData = (): IUserData => {
        return this.#userData;
    };

    authorized = (): boolean => {
        return !!this.#userData.authorized;
    };
}

export const User = new user;
