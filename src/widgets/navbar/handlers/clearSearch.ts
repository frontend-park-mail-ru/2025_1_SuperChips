import type { IFeed } from 'pages/FeedPage';
import { debouncedFeedScroll, feedState, fillFeed, searchFeedScroll, searchFeedState } from 'pages/FeedPage';


export const clearSearch = async () => {
    document.querySelector('.search-form__clear')?.classList.add('hidden');
    const input = document.querySelector<HTMLInputElement>('#search');

    if (input) {
        input.value = '';
    }

    searchFeedState.filter = '';
    searchFeedState.query = '';
    searchFeedState.page = 1;

    feedState.pageNum = 1;

    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    feed.innerHTML = '';
    await fillFeed();

    window.addEventListener('scroll', debouncedFeedScroll);
    window.removeEventListener('scroll', searchFeedScroll);
};
