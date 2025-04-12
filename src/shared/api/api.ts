import { API_BASE_URL } from 'shared/config/constants';
import { Toast } from 'shared/components/Toast';

type TMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';



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

            const response = await fetch(url, state);

            const CSRFToken = response.headers.get('X-CSRF-TOKEN') ?? localStorage.getItem('csrf');
            if (CSRFToken) {
                this.#csrf.set(CSRFToken);
            }

            return response;
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
            'X-CSRF-Token': this.#csrf.get(),
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
            'X-CSRF-Token': this.#csrf.get(),
            'Content-Type': 'multipart/form-data',
        };

        return this.request('PUT', url, headers, body);
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

        return this.request('DELETE', url, headers);
    }

    /**
     * PATCH запрос
     */
    async patch(
        url: string,
        body: object | FormData
    ): Promise<Response|Error> {
        const headers: HeadersInit = {
            'X-CSRF-Token': this.#csrf.get(),
        };

        return this.request('PATCH', url, headers, body);
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
