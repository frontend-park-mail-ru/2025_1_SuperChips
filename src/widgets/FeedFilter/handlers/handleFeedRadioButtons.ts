import { feedState } from 'pages/FeedPage';

export const handleFeedRadioButtons = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'INPUT') return;

    switch (target.id) {
    case 'filter-flows':
        feedState.filter = 'flows';
        break;
    case 'filter-boards':
        feedState.filter = 'boards';
        break;
    case 'filter-users':
        feedState.filter = 'users';
        break;
    }
};
