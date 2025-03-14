import {API_BASE_URL} from '../config/constants';

/**
 * Класс для работы с API бэкенда
 */
class Api {
    #apiBaseUrl;
    #csrf;
    constructor() {
        this.#apiBaseUrl = API_BASE_URL;
        this.#csrf = new CSRF();
    }

    /**
	 * Шаблон запроса к API
	 * @param {string} method метод запроса
	 * @param {string} path url запроса (прим '/feed' '/user')
	 * @param {object} headers HTTP заголовки
	 * @param {object} body тело запроса, если есть
	 * @returns {Promise<any>} ответ от сервера
	 */
    async request(method, path, headers, body = null) {
        try {
            const url = this.#apiBaseUrl + path;
            const state = {
                method: method,
                headers: headers,
                mode: 'cors',
                credentials: 'include',
                body: body ? JSON.stringify(body) : null,
            };

            const response = await fetch(url, state);

            const CSRFToken = response.headers.get('X-CSRF-TOKEN') ?? localStorage.getItem('csrf');
            if (CSRFToken) {
                this.#csrf.set(CSRFToken);
            }

            return await response;
        } catch {
            return new Error('Could not fetch');
        }
    }

    /**
	 * GET запрос
	 * @param {string} url url запроса
	 * @returns {Response} ответ от сервера
	 */
    async get(url) {
        const headers = {};
        return this.request('GET', url, headers);
    }

    /**
	 * POST запрос
	 * @param {string} url url запроса
	 * @param {object} body тело запроса
	 * @returns {json} ответ от сервера
	 */
    async post(url, body = null) {
        const headers = {
            'X-CSRF-Token': this.#csrf.get(),
            'Content-Type': 'application/json',
        };
        return this.request('POST', url, headers, body);
    }

    /**
	 * PUT запрос
	 * @param {string} url url запроса
	 * @param {object} body тело запроса
	 * @returns {json} ответ от сервера
	 */
    async put(url, body) {
        const headers = {
            'X-CSRF-Token': this.#csrf.get(),
            'Content-Type': 'multipart/form-data',
        };
        return this.request('PUT', url, headers, body);
    }

    /**
	 * POST запрос
	 * @param {string} url url запроса
	 * @returns {json} ответ от сервера
	 */
    async delete(url) {
        const headers = {
            'X-CSRF-Token': this.#csrf.get(),
        };
        return this.request('DELETE', url, headers);
    }
}

/**
 * Класс для хранения и работы с CSRF токенами
 */
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

export const API = new Api();

