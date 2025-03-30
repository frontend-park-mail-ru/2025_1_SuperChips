import { API_BASE_URL } from '../config/constants';
import { ErrorToast } from '../components/errorToast';

type TMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const RequestSendError = 'Ошибка при отправке данных. Попробуйте еще раз';
const RequestGetError = 'Ошибка при получении данных. Попробуйте еще раз';


/**
 * Класс для работы с API бэкенда
 */
class Api {
    readonly #apiBaseUrl: string;
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
    async request(
        method: TMethods,
        path: string,
        headers: HeadersInit | undefined,
        body: object | null = null
    ): Promise<Response|Error> {
        try {
            const url = this.#apiBaseUrl + path;

            const state: RequestInit = {
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

            return response;
        } catch {
            return new Error('Could not fetch');
        }
    }

    /**
	 * GET запрос
	 */
    async get(
        url: string
    ): Promise<Response|Error> {
        const headers: HeadersInit = {};

        const response = await this.request('GET', url, headers);
        if (response instanceof Error) {
            ErrorToast(RequestGetError);
        }

        return response;
    }

    /**
	 * POST запрос
	 */
    async post(
        url: string,
        body: object | null = null
    ): Promise<Response|Error> {
        const headers: HeadersInit = {
            'X-CSRF-Token': this.#csrf.get(),
            'Content-Type': 'application/json',
        };

        const response = await this.request('POST', url, headers, body);
        if (response instanceof Error) {
            ErrorToast(RequestSendError);
        }

        return response;
    }

    /**
	 * PUT запрос
	 */
    async put(
        url: string,
        body: object | null = null
    ): Promise<Response|Error> {
        const headers = {
            'X-CSRF-Token': this.#csrf.get(),
            'Content-Type': 'multipart/form-data',
        };

        const response = await this.request('PUT', url, headers, body);
        if (response instanceof Error) {
            ErrorToast(RequestSendError);
        }

        return response;
    }

    /**
	 * DELETE запрос
	 */
    async delete(
        url: string
    ): Promise<Response|Error> {
        const headers = {
            'X-CSRF-Token': this.#csrf.get(),
        };

        const response = await this.request('DELETE', url, headers);
        if (response instanceof Error) {
            ErrorToast(RequestSendError);
        }

        return response;
    }
}


/**
 * Класс для хранения и работы с CSRF токенами
 */
class CSRF {
    #csrfToken: string;
    constructor() {
        this.#csrfToken = '';
    }

    get() {
        return this.#csrfToken;
    }

    set(csrf: string) {
        this.#csrfToken = csrf;
    }
}

export const API = new Api();
