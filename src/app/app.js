import { goToPage } from 'shared/router';
import { User } from 'entities/User';
import './styles/fonts.scss';
import './styles/common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await User.fetchUserData();


    window.addEventListener('popstate', async () => {
        goToPage(location.pathname).finally();
    });

    goToPage(location.pathname, true).finally();
};
