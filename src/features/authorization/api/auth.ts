import type { IProfileSettings } from 'widgets/ProfileSettings';
import type { IUser } from 'entities/User';
import type { ISignupFormData } from 'pages/SignupPage';
import type { IVKIDLogin, IVKIDRegister } from 'widgets/VKID';
import { Navbar } from 'widgets/navbar';
import { navigate } from 'shared/router';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';


type TLoginData = {
    email: string;
    password: string;
};

interface IUserData extends IUser {
    shortUsername?: string,
    authorized?: boolean,
    id?: string,
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
            await BoardStorage.fetchUserBoards();
            const body = await response.json();
            this.API.setCSRFToken(body.data.csrf_token);
        }

        return response;
    }

    /**
     * Авторизация пользователя через VK ID
     */
    async VKIDLogin(data: IVKIDLogin) {
        const login = await API.post('/api/v1/auth/vkid/login', data);

        if (login instanceof Response && login.ok) {
            const body = await login.json();
            this.API.setCSRFToken(body.data.csrf_token);
            await this.fetchUserData();
            await BoardStorage.fetchUserBoards();

            await Navbar();
            await navigate('feed');
        }

        return login;
    }

    /**
     Регистрация нового пользователя
     */
    async register(userData: ISignupFormData): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/registration', userData);

        if (response instanceof Response && response.ok) {
            const body = await response.json();
            this.API.setCSRFToken(body.data.csrf_token);

            this.userData = {
                email: userData.email,
                username: userData.username,
                public_name: userData.username,
            };

            await Navbar();
            await BoardStorage.fetchUserBoards();
        }

        return response;
    }

    /**
     * Регистрация нового пользователя через VK ID
     */
    async VKIDRegister(data: IVKIDRegister) {
        const register = await API.post('/api/v1/auth/vkid/register', data);
        if (register instanceof Response && register.ok) {
            const body = await register.json();
            this.API.setCSRFToken(body.data.csrf_token);

            await this.fetchUserData();
            await BoardStorage.fetchUserBoards();
            await Navbar();
            navigate('feed').finally();
        }

        return register;
    }

    /**
	 * Завершение сессии
	 */
    async logout(): Promise<Response|Error> {
        const response = await this.API.post('/api/v1/auth/logout');

        if (response instanceof Response && response.ok) {
            await this.clearUserData();

            BoardStorage.clear();
            const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
            sidebarButtons?.classList.toggle('display-none');
            document.querySelector('.logout-toast')?.remove();
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
                id: data.user_id,
            };

            await Navbar();
            await BoardStorage.fetchUserBoards();
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
