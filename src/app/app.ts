import { navigate } from 'shared/router';
import { User } from 'entities/User';
import './styles/fonts.scss';
import './styles/common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await User.fetchUserData();


    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();
};
