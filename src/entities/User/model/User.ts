import { Auth } from 'features/authorization';

class user {
    authorized: boolean;
    #username: string | null;
    #tag: string | null;
    #avatar: string | null;

    constructor() {
        this.authorized = false;
        this.#username = null;
        this.#tag = null;
        this.#avatar = null;
    }

    fetchUserData = async (): Promise<void> => {
        const response = await Auth.getUserData();

        if (response instanceof Error) {
            return;
        }
        else if (response.ok) {
            const body = await response.json();
            const data = body.data;
            this.#username = data.username;
            this.#avatar = data.avatar;
            this.#tag = data.tag;
            this.authorized = true;
        }
    };

    clearUserData = (): void => {
        this.#username = null;
        this.#avatar = null;
        this.#tag = null;
        this.authorized = false;
    };

    getUserData = () => {
        return {
            username: this.#username,
            avatar: this.#avatar,
            tag: this.#tag,
            authorized: this.authorized,
        };
    };
}

export const User = new user;
