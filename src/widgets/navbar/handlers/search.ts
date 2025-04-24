import { Toast } from 'shared/components/Toast';
import { fillSearchFeed, searchFeedState } from 'pages/FeedPage/lib/fillSearchFeed';
import { debouncedFeedScroll, searchFeedScroll } from 'pages/FeedPage';
import { API } from 'shared/api';


export const search = async (event: Event) => {
    event.preventDefault();
    document.querySelector('.search-form__clear')?.classList.remove('hidden');

    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (!searchInput || searchInput.value === '' || searchInput.value === searchFeedState.query) return;

    const query = encodeURIComponent(searchInput.value);
    const filter = searchFeedState.filter;
    const URI = `/api/v1/search/${filter}?query=${query}&page=1&size=1`;
    const response = await API.get(URI);

    if (response instanceof Error) {
        return;
    } else if (response.status === 404) {
        Toast('По данному запросу ничего не найдено', 'message', 3000);
        return;
    } else if (response.ok) {
        searchFeedState.filter = filter;
        searchFeedState.query = query;
        searchFeedState.page = 1;

        setTimeout(async () => {
            await fillSearchFeed();
        }, 0);
        window.removeEventListener('scroll', debouncedFeedScroll);
        window.addEventListener('scroll', searchFeedScroll);
    }
};
