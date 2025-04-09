import type { ISignupFormData } from 'pages/SignupPage';
import type { IUser } from 'entities/User';
import { API } from 'shared/api';
import { Navbar } from 'widgets/navbar';
import { loadUserBoards } from 'features/boardLoader';

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
                publicName: userData.username,
                birthday: new Date(userData.birthday),
            };

            await Navbar();
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
                publicName: data.publicName || data.username,
            };


            await Navbar();

            await loadUserBoards(data.username);
        }
    };

    /**
     * Очистка данных о пользователе
     */
    clearUserData = async () => {
        this.userData = null;
        await Navbar();
    };

    /**
     * Метод для сохренения пользовательских данных при регистрации
     */
    setUserData = async (data: IUser) => {
        this.userData = {
            ...this.userData,
            username: data.username,
            publicName: data.publicName || data.username,
            email: data.email,
            birthday: new Date(data.birthday),
        };
        await Navbar();
    };

    updateProfile = async (profileData: IUser)  => {
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

}

export const Auth = new auth();
