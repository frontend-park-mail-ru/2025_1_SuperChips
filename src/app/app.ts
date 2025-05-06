import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { checkMobile } from 'shared/utils';
import { appState, navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { ChatStorage } from 'features/chat';
import './styles/fonts.scss';
import './styles/common.scss';


export const root = document.getElementById('root') as HTMLDivElement;

export const App = async () => {
    await Auth.fetchUserData();
    appState.mobile = checkMobile();
    appState.loggedWithVKID = Auth.userData?.is_external ?? false;

    await Navbar();
    await Sidebar();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();
    if (Auth.userData) {
        ChatStorage.fetchChatList().finally();
        ChatStorage.fetchContactList().finally();
    }
};
