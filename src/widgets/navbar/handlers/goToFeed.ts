import { appState, navigate } from 'shared/router';
import { clearSearch } from './clearSearch';
import { closeChatList } from 'widgets/sidebar';
import { closeFilter } from './closeFilter';

export const goToFeed = async (event: Event) => {
    event.preventDefault();
    if (appState.chat.open) {
        closeChatList();
    }
    if (appState.isFilterOpen) {
        closeFilter();
    }
    if (appState.activePage === 'feed') {
        clearSearch().finally();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        navigate('feed').finally();
    }
};
