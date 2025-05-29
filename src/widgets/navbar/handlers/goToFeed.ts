import { appState, navigate } from 'shared/router';
import { closeChatList } from 'widgets/sidebar';
import { feedState } from 'pages/FeedPage';

export const goToFeed = async (event: Event) => {
    event.preventDefault();
    if (appState.chat.open) {
        closeChatList();
    }
    if (appState.activePage === 'feed' && feedState.pageNum !== 3 || appState.search.isFiltered) { // изначально в ленте загружается 3 страницы пинов
        Object.assign(feedState, { pageNum: 1, filter: 'flows', loadedPins: [], lastScroll: 0 });
        appState.forceNavigate = true;
    }

    navigate('feed').finally();
};
