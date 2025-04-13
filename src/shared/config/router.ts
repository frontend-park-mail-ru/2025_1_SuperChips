import { FeedPage } from 'pages/FeedPage';
import { LoginPage } from 'pages/LoginPage';
import { OnePinPage } from 'pages/OnePinPage';
import { SignupPage } from 'pages/SignupPage';
import { NewPinPage } from 'pages/NewPinPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';


export interface Route {
    href: string | RegExp,
    title: string,
    render: (params: string) => Promise<HTMLDivElement>,
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
        settings: {
            href: '/settings',
            title: 'Настройки',
            render: SettingsPage,
            authOnly: true,
            hasNavbar: true,
            hasSidebar: true,
            hasBackButton: true
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
        profile: {
            href: /^[a-zA-Z0-9_]+$/,
            title: 'Профиль',
            render: (username: string) => {
                return ProfilePage(username);
            },
            hasNavbar: true,
            hasSidebar: true,
            hasBackButton: true
        },
        pin: {
            href: /^flow\/[a-zA-Z0-9]+$/,
            title: 'Flow',
            render: (flowID: string) => {
                return OnePinPage(flowID);
            },
            hasNavbar: true,
            hasSidebar: true,
            hasBackButton: true,
        }
    }
};
