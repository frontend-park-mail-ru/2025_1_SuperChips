import { fillSearchFeed } from 'pages/FeedPage';
import { Toast } from 'shared/components/Toast';
import { appState } from 'shared/router';

export const handleFeedRadioButtons = async (event: Event) => {
    const target = event.target as HTMLElement;
    const input = document.querySelector<HTMLInputElement>('#search');

    if (target.tagName !== 'INPUT' || !input) return;

    let changed = false;
    const previousFilter = appState.search.filter;

    switch (target.id) {
    case 'filter-flows':
        changed = appState.search.filter !== 'flows';
        appState.search.filter = 'flows';
        break;
    case 'filter-boards':
        changed = appState.search.filter !== 'boards';
        appState.search.filter = 'boards';
        break;
    case 'filter-users':
        changed = appState.search.filter !== 'users';
        appState.search.filter = 'users';
        break;
    }

    if (changed) {
        appState.search.page = 1;
        appState.search.query = input.value;

        if (input.value !== '') {
            try {
                await fillSearchFeed();
                Toast(`Показаны результаты в категории "${getFilterName(appState.search.filter)}"`, 'message', 2000);
            } catch {
                appState.search.filter = previousFilter;
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
