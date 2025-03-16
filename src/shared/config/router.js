import { FeedPage } from '../../pages/FeedPage';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';

export const config = {
    menu: {
        'feed': {
            href: '/feed',
            title: 'Лента',
            render: FeedPage,
            // authOnly: true,
            // showSidebar: true
        },
        'login': {
            href: '/login',
            title: 'Авторизация',
            render: LoginPage
        },
        'signup': {
            href: '/signup',
            title: 'Регистрация',
            render: SignupPage
        }
    },
};
