import type { ISignupFormData } from 'pages/SignupPage';
import type { IProfileSettings } from 'widgets/ProfileSettings';
import type { IUser } from 'entities/User';
import { API } from 'shared/api';
import { Navbar } from 'widgets/navbar';
import { fetchUserBoards } from 'features/boardLoader';
import { USER_OWN_PINS_BOARD, USER_SAVED_PINS_BOARD } from 'shared/config/constants';

type TLoginData = {
    email: string;
    password: string;
};

interface IUserData extends IUser {
    shortUsername?: string,
    authorized?: boolean,
}

/**
 * Класс, использующийся для аутентификации пользователя
 * Для одной сессии создается только один класс
 */
class auth {
    private API: typeof API;
    userData: IUserData | null;

    constructor() {
        this.API = API;
        this.userData = null;
    }

    /**
     * Авторизация пользователя
     */
    async login(
        { email, password }: TLoginData
    ): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/login', { email, password });

        if (response instanceof Response && response.ok) {
            await this.fetchUserData();
        }

        return response;
    }

    /**
     Регистрация нового пользователя
     */
    async register(userData: ISignupFormData): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/registration', userData);

        if (response instanceof Response && response.ok) {
            this.userData = {
                email: userData.email,
                username: userData.username,
                public_name: userData.username,
                birthday: new Date(userData.birthday),
            };

            await Navbar();
            await API.post(
                `/api/v1/users/${userData.username}/boards`,
                { name: USER_OWN_PINS_BOARD, is_private: false }
            );
            await API.post(
                `/api/v1/users/${userData.username}/boards`,
                { name: USER_SAVED_PINS_BOARD, is_private: false }
            );
        }

        return response;
    }

    /**
	 * Завершение сессии
	 */
    async logout(): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/logout');

        if (response instanceof Response && response.ok) {
            await this.clearUserData();
        }

        return response;
    }

    /**
     * Получение данных о пользователе
     */
    fetchUserData = async (): Promise<void> => {
        const userData = await this.API.get('/api/v1/profile');

        if (userData instanceof Response && userData.ok) {
            const body = await userData.json();
            const data = body.data;

            this.userData = {
                ...data,
                birthday: new Date(data.birthday),
                shortUsername: data.username[0].toUpperCase(),
                authorized: true,
                public_name: data.publicName || data.username,
            };

            await Navbar();
            await fetchUserBoards(data.username);
        }
    };

    /**
     * Очистка данных о пользователе
     */
    clearUserData = async () => {
        this.userData = null;
        await Navbar();
    };

    setUserData = (params: IProfileSettings) => {
        if (this.userData) {
            this.userData = {
                ...this.userData,
                public_name: params.public_name ?? this.userData.public_name,
                about: params.about ?? this.userData.about,
                shortUsername: params.public_name ? params.public_name[0].toUpperCase() : this.userData.shortUsername,
                birthday: params.birthday ? new Date(params.birthday) : this.userData.birthday,
            };
        }
    };
}

export const Auth = new auth();
