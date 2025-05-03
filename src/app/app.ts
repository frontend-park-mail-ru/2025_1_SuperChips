import { appState, navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { checkMobile } from 'shared/utils';
import { Auth } from 'features/authorization';
import './styles/fonts.scss';
import './styles/common.scss';
import { ChatStorage } from '../features/chat';


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

    ChatStorage.fetchChatList().finally();
    ChatStorage.fetchContactList().finally();


    //TODO remove
    {
        // setTimeout(() => {
        //     document.querySelector<HTMLElement>('#chats')?.click();
        // document.querySelector<HTMLElement>('#chat-4')?.click();
        // }, 0);

        setInterval(() => {
            const chat = ChatStorage.getChatByID('4');
            if (!chat) return;

            ChatStorage.getMessage('4', {
                message: 'Hello World!',
                timestamp: new Date(),
                sender: chat.username,
                read: false,
                id: chat.messages.length + 1,
            });
        }, 10000);
        setInterval(() => {
            const chat = ChatStorage.getChatByID('5');
            if (!chat) return;

            ChatStorage.getMessage('5', {
                message: 'zalupalupa',
                timestamp: new Date(),
                sender: chat.username,
                read: false,
                id: chat.messages.length + 1,
            });
        }, 30000);
        // for (let i = 0; i < 100; i++) {
        //     const chat = ChatStorage.getChatByID('2');
        //     if (!chat) return;
        //
        //     ChatStorage.getMessage('2', {
        //         message: 'Hello World!',
        //         timestamp: new Date(),
        //         sender: chat.username,
        //         read: false,
        //         id: chat.messages.length + 1,
        //     });
        // }
    }
};
