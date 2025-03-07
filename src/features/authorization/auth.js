import { API } from '../../shared/api/api';


class auth {
    constructor() {
        this.API = API;
    }

    /**
	 * Авторизация пользователя
	 * @param {string} email
	 * @param {string} password
	 * @returns {json} Ответ от сервера
	 */
    async login({email, password}) {
        try {
            const response = await this.API.post('/api/v1/auth/login', { email, password });
            if (response.error) {
                return new Error(response.error);
            }
            return response;
        } catch (error) {
            return new Error(`Login failed: ${error.message}`);
        }
    }

    /**
	 * Регистрация нового пользователя
	 * @param {json} userData
	 * @returns {json} Ответ от сервера
	 */
    async register(userData) {
        try {
            const response = await this.API.post('/api/v1/auth/registration', userData);
            if (response.error) {
                return new Error(response.error);
            }
            return response;
        } catch (error) {
            return new Error(`Registration failed: ${error.message}`);
        }
    }

    /**
	 * Выход из сессии
	 * @returns {void} Ответ сервера
	 */
    async logout() {
        try {
            await this.API.post('/api/v1/auth/logout');
        } catch (error) {
            return new Error(`Logout failed: ${error.message}`);
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
            const response = await this.API.get('/api/v1/auth/user');
            if (response.error) {
                return new Error(response.error);
            }
            return response;
        } catch (error) {
            return new Error(`Failed to fetch user data: ${error.message}`);
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
            return error;
        }
    }
}

export const Auth = new auth();
