import { handleFeedRadioButtons } from '../handlers/handleFeedRadioButtons';
import { feedState } from 'pages/FeedPage';
import './FeedFilter.scss';
import template from './FeedFilter.hbs';


export const FeedFilter = () => {
    const container = document.createElement('div');
    container.classList.add('feed-filter-placeholder');
    container.id = 'feed-filter';

    const filter = feedState.filter;

    const config = {
        filterItem: [
            {
                title: 'Все flow',
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
    return container;
};
