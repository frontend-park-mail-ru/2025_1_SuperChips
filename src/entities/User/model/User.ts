import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';
import { IUserData } from './types';
import { ISignupFormData } from 'pages/SignupPage';
import { Navbar } from '../../../widgets/navbar';

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


            const navbar = document.querySelector('.navbar');
            navbar?.replaceWith(await Navbar());
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

    clearUserData = async () => {
        Object.keys(this.#userData).forEach((item: string) => {
            const key = item as keyof IUserData;
            this.#userData[key] = null;
        });

        const navbar = document.querySelector('.navbar');
        navbar?.replaceWith(await Navbar());
    };

    getUserData = (): IUserData => {
        return this.#userData;
    };

    authorized = (): boolean => {
        return !!this.#userData.authorized;
    };

    setUserData = async (data: ISignupFormData) => {
        this.#userData.username = data.username;
        this.#userData.shortUsername = data.username[0].toUpperCase();
        this.#userData.birthday = new Date(data.birthday);
        this.#userData.email = data.email;
        this.#userData.authorized = true;

        const navbar = document.querySelector('.navbar');
        navbar?.replaceWith(await Navbar());
    };
}

export const User = new user;
