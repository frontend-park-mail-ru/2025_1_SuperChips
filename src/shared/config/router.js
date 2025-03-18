import { FeedPage } from '../../pages/FeedPage';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';

export const config = {
    menu: {
        '/feed': {
            href: '/feed',
            title: 'Лента',
            render: FeedPage,
        },
        '/login': {
            href: '/login',
            title: 'Авторизация',
            render: LoginPage,
            nonAuthOnly: true,
        },
        '/signup': {
            href: '/signup',
            title: 'Регистрация',
            render: SignupPage,
            nonAuthOnly: true,
        }
    },
};
