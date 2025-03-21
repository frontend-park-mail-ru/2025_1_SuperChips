import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { SignupPage } from 'pages/SignupPage';


interface PageConfig {
    href: string,
    title: string,
    render: () => Promise<HTMLDivElement>,
    nonAuthOnly?: boolean,
}

interface MenuConfig {
    [key: string]: PageConfig
}

interface RouterConfig {
    menu: MenuConfig
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
