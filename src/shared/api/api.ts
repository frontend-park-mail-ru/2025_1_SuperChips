import { API_BASE_URL } from 'shared/config/constants';
import { Toast } from 'shared/components/Toast';

type TMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';



/**
 * Класс для работы с API бэкенда
 */
class Api {
    readonly #apiBaseUrl: string;
    private csrf: string;

    constructor() {
        this.#apiBaseUrl = API_BASE_URL;
        const csrf = localStorage.getItem('csrf');
        this.csrf = csrf ? csrf : '';
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
        body: object | FormData | null = null
    ): Promise<Response|Error> {
        try {
            const url = this.#apiBaseUrl + path;
            let bodyPayload;

            if (body instanceof FormData) {
                bodyPayload = body;
            } else if (body) {
                bodyPayload = JSON.stringify(body);
                if (headers) {
                    headers = {
                        ...headers,
                        'Content-Type': 'application/json'
                    };
                }
            } else {
                bodyPayload = null;
            }

            const state: RequestInit = {
                method: method,
                headers: headers,
                mode: 'cors',
                credentials: 'include',
                body: bodyPayload,
            };
            return await fetch(url, state);
        } catch {
            const message = method === 'GET'
                ? 'Ошибка при получении данных. Попробуйте еще раз'
                : 'Ошибка при отправке данных. Попробуйте еще раз';

            Toast(message);
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

        return this.request('GET', url, headers);
    }

    /**
	 * POST запрос
	 */
    async post(
        url: string,
        body: object | FormData | null = null
    ): Promise<Response|Error> {
        const headers: HeadersInit = {
            'X-CSRF-Token': this.csrf,
        };

        return this.request('POST', url, headers, body);
    }

    /**
	 * PUT запрос
	 */
    async put(
        url: string,
        body: object | FormData | null = null
    ): Promise<Response|Error> {
        const headers = {
            'X-CSRF-Token': this.csrf,
            'Content-Type': 'multipart/form-data',
        };

        return this.request('PUT', url, headers, body);
    }

    /**
	 * DELETE запрос
	 */
    async delete(
        url: string,
        body: object | FormData | null = null
    ): Promise<Response|Error> {
        const headers = {
            'X-CSRF-Token': this.csrf,
        };

        return this.request('DELETE', url, headers, body);
    }

    /**
     * PATCH запрос
     */
    async patch(
        url: string,
        body: object | FormData
    ): Promise<Response|Error> {
        const headers: HeadersInit = {
            'X-CSRF-Token': this.csrf,
        };

        return this.request('PATCH', url, headers, body);
    }

    /**
     * HEAD запрос для проверки существования содержимого по URL
     * @param url
     */
    async head(
        url: string,
    ): Promise<Response | Error> {
        try {
            return await fetch(url, { method: 'HEAD' });
        } catch {
            return new Error('Could not fetch');
        }
    }

    setCSRFToken(
        token: string,
    ) {
        localStorage.setItem('csrf', token);
        this.csrf = token;
    }
}


export const API = new Api();
