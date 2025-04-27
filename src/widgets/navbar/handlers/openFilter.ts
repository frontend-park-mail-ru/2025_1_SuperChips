import { FeedFilter } from 'widgets/FeedFilter';
import { closeFilter } from './closeFilter';
import { appState } from 'shared/router';
import { root } from 'app/app';


export const openFilter = () => {
    if (appState.activePage !== 'feed') return;
    // const feedContainer = document.querySelector('.feed-container');
    // const feed = document.querySelector<IFeed>('#feed');
    // if (!feedContainer || !feed) return;

    root.insertAdjacentElement('afterend', FeedFilter());

    // if (feed.masonry) {
    //     feed.masonry.layout();
    // }

    const filter = document.querySelector('#filter-button');
    filter?.removeEventListener('click', openFilter);
    filter?.addEventListener('click', closeFilter);
};
