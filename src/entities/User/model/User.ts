import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';
import { IUserData } from './types';

class user {
    authorized: boolean;
    #username: string;
    #tag: string;
    #avatar: string;
    #firstName: string;
    #lastName: string;
    #birthDate: Date;
    #about: string;
    #email: string;

    constructor() {
        this.authorized = false;
        this.#username = '';
        this.#tag = '';
        this.#avatar = '';
        this.#firstName = '';
        this.#lastName = '';
        this.#birthDate = new Date;
        this.#about = '';
        this.#email = '';
    }

    fetchUserData = async (): Promise<void> => {
        const response = await Auth.getUserData();

        if (response instanceof Error) { return; }

        if (response.ok) {
            const body = await response.json();
            const data = body.data;

            this.#username = data.username;
            this.#avatar = data.avatar;
            this.#tag = data.tag;
            this.#firstName = data.firstName;
            this.#lastName = data.lastName;
            this.#birthDate = data.birthDate;
            this.#about = data.about;
            this.#email = data.email;
            this.authorized = true;
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
        this.#username = '';
        this.#avatar = '';
        this.#tag = '';
        this.#firstName = '';
        this.#lastName = '';
        this.#birthDate = new Date;
        this.#about = '';
        this.#email = '';
        this.authorized = false;
    };

    getUserData = (): IUserData => {
        return {
            username: this.#username,
            avatar: this.#avatar,
            tag: this.#tag,
            firstName: this.#firstName,
            lastName: this.#lastName,
            birthDate: this.#birthDate,
            about: this.#about,
            email: this.#email,
            authorized: this.authorized,
        };
    };
}

export const User = new user;
