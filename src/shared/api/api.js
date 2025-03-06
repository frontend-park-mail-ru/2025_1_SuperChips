import { constants } from '../config/constants';
import { csrf } from '../CSRF/CSRF';

export class Api {
	#apiBaseUrl;
	#CSRF;
	constructor() {
		this.#apiBaseUrl = constants.apiBaseUrl;
		this.#CSRF = csrf;
	}

	/**
	 * Шаблон запроса к API
	 * @param {string} method метод запроса
	 * @param {string} path url запроса (прим '/feed' '/user')
	 * @param {string} headers HTTP заголовки
	 * @param {object} body тело запроса, если есть
	 * @returns {json} ответ от сервера
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
				csrf.set(CSRFToken);
			}

			return await response.json()
		} catch {
			throw new Error('Could not fetch');
		}
	}

	/**
	 * GET запрос
	 * @param {string} url url запроса
	 * @returns {json} ответ от сервера
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
				'Access-Control-Allow-Credentials': 'true',
				'X-CSRF-Token': csrf.get(),
				'Content-Type': 'application/json;charset=utf-8',
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
			'Access-Control-Allow-Credentials': 'true',
			'X-CSRF-Token': csrf.get(),
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
			'X-CSRF-Token': csrf.get(),
		};
		return this.request('DELETE', url, headers);
	}
}
