import { API } from '../../../shared/api/api';


/**
 * Класс, использующийся для аутентификации пользователя
 * Для одной сессии создается только один класс
 */
class auth {
    constructor() {
        this.API = API;
    }

    /**
	 * Авторизация пользователя	 * @param email
	 * @param {string}
	 * @param {string} email
	 * @returns {Promise<json|Error>} ответ сервера
	 */
    async login({email, password}) {
        try {
            const response = await this.API.post('/api/v1/auth/login',{ email, password });
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
	 * @param {json} userData - email, имя пользователя, дата рождения, пароль
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
	 * Завершение сессии
	 * @returns {Promise<Error>} ответ сервера
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
	 * username: 	{{username}},
	 * avatar: 		{{avatar_url}},
	 * birthday: 	{{birthday}},
	 * email: 		{{email}},
	 * }
	 * @returns {Response} Ответ от сервера
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
}

export const Auth = new auth();
