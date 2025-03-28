import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';
import { IUser } from './types';
import { ErrorToast } from 'shared/components/errorToast';

class user {
    #userData: IUser;
    // #authorized: boolean | null;
    // #username: string | null;
    // #tag: string | null;
    // #avatar: string | null;
    // #firstName: string | null;
    // #lastName: string | null;
    // #birthDate: Date | null;
    // #about: string | null;
    // #email: string | null;

    constructor() {
        this.#userData = {
            authorized: false,
            username: null,
            tag: null,
            avatar: null,
            firstName: null,
            lastName: null,
            birthday: null,
            about: null,
            email: null,
        };
        // this.#authorized = false;
        // this.#username = null;
        // this.#tag = null;
        // this.#avatar = null;
        // this.#firstName = null;
        // this.#lastName = null;
        // this.#birthDate = null;
        // this.#about = null;
        // this.#email = null;
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
                authorized: true,
            };
            // this.#username = data.username;
            // this.#avatar = data.avatar;
            // this.#tag = data.tag;
            // this.#firstName = data.firstName;
            // this.#lastName = data.lastName;
            // this.#birthDate = data.birthDate;
            // this.#about = data.about;
            // this.#email = data.email;
            // this.#authorized = true;
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
            const key = item as keyof IUser;
            this.#userData[key] = null;
        });
    };

    getUserData = (): IUser => {
        return this.#userData;
    };

    authorized = (): boolean => {
        return !!this.#userData.authorized;
    };
}

export const User = new user;
