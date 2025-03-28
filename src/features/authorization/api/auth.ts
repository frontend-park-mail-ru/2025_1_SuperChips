import { API } from 'shared/api/api';
import { ISignupFormData } from 'pages/SignupPage';
import { ErrorToast } from 'shared/components/errorToast';
import { Navbar } from '../../../widgets/navbar';

type TLoginData = {
    email: string;
    password: string;
};

/**
 * Класс, использующийся для аутентификации пользователя
 * Для одной сессии создается только один класс
 */
class auth {
    private API: typeof API;

    constructor() {
        this.API = API;
    }

    /**
     * Авторизация пользователя
     * @returns {Promise<Response | Error>} ответ сервера
     */
    async login(
        { email, password }: TLoginData
    ): Promise<Response|Error> {
        try {
            const response = this.API.post('/api/v1/auth/login', { email, password });

            const navbar = document.querySelector('.navbar');
            if (navbar) navbar.replaceWith(await Navbar());

            return response;
        } catch (error) {
            ErrorToast('Ошибка при отправке данных. Попробуйте еще раз');
            return new Error(`Login failed: ${error}`);
        }
    }

    /**
     Регистрация нового пользователя
     * @param {Object} userData - email, имя пользователя, дата рождения, пароль
     * @returns {Promise<json|Error>} - ответ от сервера
     */
    async register(userData: ISignupFormData): Promise<Response|Error> {
        try {
            return await this.API.post('/api/v1/auth/registration', userData);
        } catch (error) {
            ErrorToast('Ошибка при отправке данных. Попробуйте еще раз');
            return new Error(`Registration failed: ${error}`);
        }
    }

    /**
	 * Завершение сессии
	 * @returns {Promise<Error>} ответ сервера
	 */
    async logout(): Promise<Response|Error> {
        try {
            const response = this.API.post('/api/v1/auth/logout');

            const navbar = document.querySelector('.navbar');
            if (navbar) navbar.replaceWith(await Navbar());

            return response;
        } catch (error) {
            return new Error(`Logout failed: ${error}`);
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
    async getUserData(): Promise<Response|Error> {
        try {
            return await this.API.get('/api/v1/auth/user');
        } catch (error) {
            return new Error(`Failed to fetch user data: ${error}`);
        }
    }
}

export const Auth = new auth();
