export class User {
    #username;
    #avatar;
    #birthday;
    #email;

    constructor(data) {
        this.#username = data.username;
        this.#avatar = data.avatar;
        this.#birthday = data.birthday;
        this.#email = data.email;
    }

    getUserData = () => {
        return {
            username: this.#username,
            avatar: this.#avatar,
            email: this.#email,
            birthday: this.#birthday,
        };
    };
}
