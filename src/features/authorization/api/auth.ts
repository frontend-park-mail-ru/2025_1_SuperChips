import { ISignupFormData } from 'pages/SignupPage';
import { ErrorToast } from 'shared/components/errorToast';
import { Navbar } from 'widgets/navbar';
import { User } from 'entities/User';
import { API } from 'shared/api/api';

type TLoginData = {
    email: string;
    password: string;
};

const ErrorMessageSend = 'Ошибка при отправке данных. Попробуйте еще раз';
const ErrorMessageLoad = 'Ошибка при отправке данных. Попробуйте еще раз';
const ErrorMessageConnection = 'Проблемы с соединением. Попробуйте еще раз';
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
     */
    async login(
        { email, password }: TLoginData
    ): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/login', { email, password });
        if (response instanceof Error) {
            ErrorToast(ErrorMessageLoad);
        } else if (response?.status !== 401) {
            await User.fetchUserData();
        }
        return response;
    }

    /**
     Регистрация нового пользователя
     */
    async register(userData: ISignupFormData): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/registration', userData);

        if (response instanceof Error) {
            ErrorToast(ErrorMessageSend);
        } else {
            User.setUserData(userData);
        }

        return response;
    }

    /**
	 * Завершение сессии
	 */
    async logout(): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/logout');

        if (response instanceof Error) {
            ErrorToast(ErrorMessageConnection);
        } else {
            User.clearUserData();
        }

        return response;
    }

    /**
	 * Получение данных о пользователе в формате:
	 * {
	 * username: 	{{username}},
	 * avatar: 		{{avatar_url}},
	 * birthday: 	{{birthday}},
	 * email: 		{{email}},
	 * }
	 */
    async getUserData(): Promise<Response|Error> {
        const response = await this.API.get('/api/v1/auth/user');

        if (response instanceof Error) {
            ErrorToast(ErrorMessageLoad);
        }

        return response;
    }
}

export const Auth = new auth();
