class CSRF {
    #csrfToken;
    constructor() {
        this.#csrfToken = '';
    }

    get() {
        return this.#csrfToken;
    }

    set(csrf) {
        this.#csrfToken = csrf;
    }
}

export const csrf = new CSRF();