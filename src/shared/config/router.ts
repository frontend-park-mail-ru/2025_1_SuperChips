import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { SignupPage } from 'pages/SignupPage';
import { NewPinPage } from '../../pages/NewPinPage';


export interface Route {
    href: string | RegExp,
    title: string,
    render: (params: string[] | null) => Promise<HTMLDivElement>,
    nonAuthOnly?: boolean,
    authOnly?: boolean,
    hasNavbar?: boolean,
    hasSidebar?: boolean,
    hasBackButton?: boolean,
}

interface MenuConfig {
    [key: string]: Route
}

interface RouterConfig {
    menu: MenuConfig
}


export const config: RouterConfig = {
    menu: {
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
        },
        feed: {
            href: '/feed',
            title: 'Лента',
            render: FeedPage,
            hasNavbar: true,
            hasSidebar: true,
        },
        newPin: {
            href: '/flow/new',
            title: 'Новый flow',
            render: NewPinPage,
            authOnly: true,
            hasSidebar: true,
            hasNavbar: true,
            hasBackButton: true
        },
    },
};
