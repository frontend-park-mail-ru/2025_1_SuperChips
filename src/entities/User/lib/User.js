import { Auth } from 'features/authorization/api/auth';

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
        if (response.ok) {
            const data = await response.json();
            this.#username = data.username;
            this.#avatar = data.avatar;
            this.#tag = data.tag;
            this.authorized = true;
        }
    };

    // login = async () => {
    //     const data = {
    //         username: 'Valekir',
    //         tag: 'creative_id237',
    //         avatar: 'http://146.185.208.105:8080/static/img/18d6c98da28bee541c91931f1b0bb12f.jpg',
    //     };
    //     this.#username = data.username;
    //     this.#avatar = data.avatar;
    //     this.#tag = data.tag;
    //     this.authorized = true;
    // };

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
