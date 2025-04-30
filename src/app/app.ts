import { appState, navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { checkMobile } from 'shared/utils';
import { Auth } from 'features/authorization';
import { PIN_WIDTH, PIN_WIDTH_MOBILE } from '../shared/config/constants';
import './styles/fonts.scss';
import './styles/common.scss';


export const root = document.getElementById('root') as HTMLDivElement;

export const App = async () => {
    await Auth.fetchUserData();
    appState.mobile = checkMobile();
    appState.pinWidth = appState.mobile ? PIN_WIDTH_MOBILE : PIN_WIDTH;

    await Navbar();
    await Sidebar();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();
};
