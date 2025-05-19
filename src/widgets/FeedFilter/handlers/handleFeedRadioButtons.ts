import { fillSearchFeed, searchFeedState } from 'pages/FeedPage';
import { Toast } from 'shared/components/Toast';

export const handleFeedRadioButtons = async (event: Event) => {
    const target = event.target as HTMLElement;
    const input = document.querySelector<HTMLInputElement>('#search');

    if (target.tagName !== 'INPUT' || !input) return;

    let changed = false;
    const previousFilter = searchFeedState.filter;

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

    if (changed) {
        searchFeedState.page = 1;
        searchFeedState.query = input.value;

        if (input.value !== '') {
            try {
                await fillSearchFeed();
                Toast(`Показаны результаты в категории "${getFilterName(searchFeedState.filter)}"`, 'message', 2000);
            } catch (error) {
                searchFeedState.filter = previousFilter;
                Toast('Произошла ошибка при смене фильтра', 'error');
            }
        }
    }
};

const getFilterName = (filter: string): string => {
    switch (filter) {
    case 'flows':
        return 'Flow';
    case 'boards':
        return 'Доски';
    case 'users':
        return 'Люди';
    default:
        return '';
    }
};
