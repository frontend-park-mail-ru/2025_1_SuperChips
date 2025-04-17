import { navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { Auth } from 'features/authorization';
import './styles/fonts.scss';
import './styles/common.scss';


export const root = document.getElementById('root') as HTMLDivElement;

export const App = async () => {
    await Auth.fetchUserData();

    await Navbar();
    await Sidebar();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();
};
