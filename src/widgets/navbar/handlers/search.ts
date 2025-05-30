import { Toast } from 'shared/components/Toast';
import { fillSearchFeed } from 'pages/FeedPage/lib/fillSearchFeed';
import { closeFilter } from './closeFilter';
import { clearSearch } from './clearSearch';
import { API } from 'shared/api';
import { appState, navigate } from 'shared/router';


export const search = async (event: Event) => {
    event.preventDefault();
    document.querySelector('.search-form__clear')?.classList.remove('hidden');

    const searchInput = document.querySelector<HTMLInputElement>('#search');

    if (searchInput?.value === '') clearSearch().finally();
    if (!searchInput || searchInput.value === '' || searchInput.value === appState.search.query) return;

    const query = encodeURIComponent(searchInput.value);
    const filter = appState.search.filter;

    if (appState.search.notFound && appState.search.query === query && appState.search.filter === filter) {
        return;
    }

    const URI = `/search/${filter}?query=${query}&page=1&size=1`;
    const response = await API.get(URI);

    if (response instanceof Error) {
        return;
    } else if (response.status === 404) {
        Object.assign(appState.search, { filter, query, notFound: true });
        Toast('По данному запросу ничего не найдено', 'message', 3000);
        return;
    } else if (response.ok) {
        if (appState.activePage !== 'feed') {
            await navigate('feed');
        }

        Object.assign(appState.search, { filter, query, page: 1 });

        if (appState.mobile) {
            closeFilter();
        }
        await fillSearchFeed();
    }
};
