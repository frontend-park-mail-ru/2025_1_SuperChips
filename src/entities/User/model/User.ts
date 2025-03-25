import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';

class user {
    authorized: boolean;
    #username: string | null;
    #tag: string | null;
    #avatar: string | null;
    #firstName: string | null;
    #lastName: string | null;
    #birthDate: string | null;
    #about: string | null;
    #email: string | null;

    constructor() {
        this.authorized = false;
        this.#username = null;
        this.#tag = null;
        this.#avatar = null;
        this.#firstName = null;
        this.#lastName = null;
        this.#birthDate = null;
        this.#about = null;
        this.#email = null;
    }

    fetchUserData = async (): Promise<void> => {
        const response = await Auth.getUserData();

        if (response instanceof Error) { return; }
        else if (response.ok) {
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
    }): Promise<Response> => {
        return await API.put('/api/v1/user/profile', profileData);
    };

    updatePassword = async (passwords: {
        currentPassword: string;
        newPassword: string;
    }): Promise<Response> => {
        return await API.put('/api/v1/user/password', passwords);
    };

    updateAvatar = async (formData: FormData): Promise<Response> => {
        return await API.put('/api/v1/user/avatar', formData);
    };

    clearUserData = () => {
        this.#username = null;
        this.#avatar = null;
        this.#tag = null;
        this.#firstName = null;
        this.#lastName = null;
        this.#birthDate = null;
        this.#about = null;
        this.#email = null;
        this.authorized = false;
    };

    getUserData = () => {
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
