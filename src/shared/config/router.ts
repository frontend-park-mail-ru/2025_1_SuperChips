import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { SignupPage } from 'pages/SignupPage';


interface RouterConfig{
    menu: {
        [key: string]: {
            href: string,
            title: string,
            render: () => HTMLDivElement,
            nonAuthOnly?: boolean,
        };
    }
}


export const config: RouterConfig = {
    menu: {
        feed: {
            href: '/feed',
            title: 'Лента',
            render: FeedPage,
        },
        login: {
            href: '/login',
            title: 'Авторизация',
            render: LoginPage,
            nonAuthOnly: true,
        },
        signup: {
            href: '/signup',
            title: 'Регистрация',
            render: SignupPage,
            nonAuthOnly: true,
        }
    },
};
