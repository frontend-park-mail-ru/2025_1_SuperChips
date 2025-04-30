import { clearSearch, search } from 'widgets/navbar';
import { handleFeedRadioButtons } from '../handlers/handleFeedRadioButtons';
import { searchFeedState } from 'pages/FeedPage';
import { appState } from 'shared/router';
import './FeedFilter.scss';
import template from './FeedFilter.hbs';


export const FeedFilter = () => {
    const container = document.createElement('div');
    container.classList.add('feed-filter-placeholder');
    container.id = 'feed-filter';

    const filter = searchFeedState.filter;

    const config = {
        mobile: appState.mobile,
        filterItem: [
            {
                title: 'Flow',
                id: 'filter-flows',
                checked: filter === 'flows',
            },
            {
                title: 'Доски',
                id: 'filter-boards',
                checked: filter === 'boards',
            },
            {
                title: 'Люди',
                id: 'filter-users',
                checked: filter === 'users',
            },
        ]
    };

    container.innerHTML = template(config);

    container.addEventListener('click', (event) => handleFeedRadioButtons(event));

    if (appState.mobile) {
        const searchForm = container.querySelector<HTMLFormElement>('.mobile-search-form-container');
        searchForm?.addEventListener('submit', search);

        const clearButton = container.querySelector('#clear-search');
        clearButton?.addEventListener('click', clearSearch);
    }

    return container;
};
