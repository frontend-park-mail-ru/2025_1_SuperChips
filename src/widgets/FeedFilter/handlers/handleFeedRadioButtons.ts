import { fillSearchFeed, searchFeedState } from 'pages/FeedPage';

export const handleFeedRadioButtons = async (event: Event) => {
    const target = event.target as HTMLElement;
    const input = document.querySelector<HTMLInputElement>('#search');

    if (target.tagName !== 'INPUT' || !input) return;

    let changed = false;

    switch (target.id) {
    case 'filter-flows':
        changed = searchFeedState.filter !== 'flows';
        searchFeedState.filter = 'flows';
        break;
    case 'filter-boards':
        changed = searchFeedState.filter !== 'boards';
        searchFeedState.filter = 'boards';
        break;
    case 'filter-users':
        changed = searchFeedState.filter !== 'users';
        searchFeedState.filter = 'users';
        break;
    }

    searchFeedState.page = 1;

    if (input.value !== '' && changed) {
        await fillSearchFeed();
    }
};
