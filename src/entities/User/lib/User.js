import { Auth } from 'features/authorization';

class user {
    authorized;
    #username;
    #tag;
    #avatar;

    constructor() {
        this.authorized = false;
        this.#username = null;
        this.#tag = null;
        this.#avatar = null;
    }

    login = async () => {
        const response = await Auth.getUserData();
        const body = await response.json();
        if (response.ok) {
            const data = body.data;
            this.#username = data.username;
            this.#avatar = data.avatar;
            this.#tag = data.tag;
            this.authorized = true;
        }
    };

    logout = () => {
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
