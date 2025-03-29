import type { ISignupFormData } from 'pages/SignupPage';
import { ErrorToast } from 'shared/components/errorToast';
import { API } from 'shared/api/api';
import { IUser } from '../model/types';
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
    userData: IUser | null;

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
        if (response instanceof Response && response?.status !== 401) {
            await this.fetchUserData();
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
     * Получение данных о пользователе
     */
    fetchUserData = async (): Promise<void> => {
        const response = await this.API.get('/api/v1/auth/user');

        if (response instanceof Error) {
            return;
        }

        if (response.ok) {
            const body = await response.json();
            const data = body.data;

            this.userData = {
                ...data,
                birthday: new Date(data.birthday),
                shortUsername: data.username[0].toUpperCase(),
                authorized: true,
            };


            await Navbar();
        }
    };

    updateProfile = async (profileData: {
        firstName: string;
        lastName: string;
        username: string;
        birthDate: string;
        about: string;
    }) => {
        return await API.put('/api/v1/user/profile', profileData);
    };

    updatePassword = async (passwords: {
        currentPassword: string;
        newPassword: string;
    }) => {
        return await API.put('/api/v1/user/password', passwords);
    };

    updateAvatar = async (formData: FormData) => {
        return await API.put('/api/v1/user/avatar', formData);
    };

    clearUserData = async () => {
        this.userData = null;

        await Navbar();
    };

    setUserData = async (data: ISignupFormData) => {
        this.userData = {
            username: data.username,
            email: data.email,
            birthday: new Date(data.birthday),
        };
        await Navbar();
    };
}

export const Auth = new auth();
