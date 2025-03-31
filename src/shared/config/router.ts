import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { SignupPage } from 'pages/SignupPage';
import { ProfilePage } from '../../pages/ProfilePage';


interface PageConfig {
    href: string | RegExp,
    title: string,
    render: (params: string) => Promise<HTMLDivElement>,
    nonAuthOnly?: boolean,
    authOnly?: boolean,
    hasNavbar?: boolean,
    hasSidebar?: boolean,
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
            hasNavbar: true,
            hasSidebar: true,
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
        },
        profile: {
            href: /$[a-zA-Z0-9_]+^/,
            title: 'Профиль',
            render: (username: string) => {
                return ProfilePage(username);
            },
            hasNavbar: true,
            hasSidebar: true,
        }
    }
};
