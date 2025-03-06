import { Api } from '../../shared/api/api'


export class Auth {
	constructor() {
		this.api = new Api();
	}

	/**
	 * Авторизация пользователя
	 * @param {string} email
	 * @param {string} password
	 * @returns {json} Ответ от сервера
	 */
	async login(email, password) {
		try {
			const response = await this.api.post('/api/v1/auth/login', { email, password });
			if (response.error) {
				throw new Error(response.error);
			}
			return response;
		} catch (error) {
			throw new Error(`Login failed: ${error.message}`);
		}
	}

	/**
	 * Регистрация нового пользователя
	 * @param {json} userData
	 * @returns {json} Ответ от сервера
	 */
	async register(userData) {
		try {
			const response = await this.api.post('/api/v1/auth/registration', userData);
			if (response.error) {
				throw new Error(response.error);
			}
			return response;
		} catch (error) {
			throw new Error(`Registration failed: ${error.message}`);
		}
	}

	/**
	 * Выход из сессии
	 * @returns {void} Ответ сервера
	 */
	async logout() {
		try {
			await this.api.post('/api/v1/auth/logout');
		} catch (error) {
			throw new Error(`Logout failed: ${error.message}`);
		}
	}

	/**
	 * Получение данных о пользователе в формате:
	 * {
	 * "username": "{{username}}",
	 * "avatar": "{{avatar_url}}",
	 * "birthday": "{{birthday}}",
	 * "email": "{{email}}",
	 * }
	 * @returns {json} Ответ от сервера
	 */
	async getUserData() {
		try {
			const response = await this.api.get('/api/v1/auth/user');
			if (response.error) {
				throw new Error(response.error);
			}
			return response;
		} catch (error) {
			throw new Error(`Failed to fetch user data: ${error.message}`);
		}
	}

	/**
	 * Проверяет, авторизован ли пользователь
	 * @returns {boolean} Ответ от сервера
	 */
	async checkAuthStatus() {
		try {
			await this.getUserData();
			return true;
		} catch (error) {
			if (error.status === 401) {
				return false;
			}
			throw error;
		}
	}
}
