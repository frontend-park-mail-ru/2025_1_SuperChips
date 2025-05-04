import { closeFilter } from 'widgets/navbar';
import { closeChatList } from './closeChatList';
import { appState, navigate } from 'shared/router';

export const handleBackButton = () => {
    if (appState.chat.open && appState.mobile) {
        closeChatList();
        return;
    }
    if (appState.isFilterOpen && appState.mobile) {
        closeFilter();
        return;
    }
    if (appState.lastPage) {
        history.back();
    } else {
        navigate('feed');
    }
};
