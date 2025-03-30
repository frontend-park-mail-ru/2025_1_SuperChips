import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { SignupPage } from 'pages/SignupPage';
import { NewPinPage } from '../../pages/NewPinPage';


interface PageConfig {
    href: string,
    title: string,
    render: () => Promise<HTMLDivElement>,
    nonAuthOnly?: boolean,
    authOnly?: boolean,
    hasNavbar?: boolean,
    hasSidebar?: boolean,
    hasBackButton?: boolean,
}

interface MenuConfig {
    [key: string]: PageConfig
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
            href: '/newPin',
            title: 'Новый flow',
            render: NewPinPage,
            authOnly: true,
            hasSidebar: true,
            hasNavbar: true,
            hasBackButton: true
        },
    },
};
