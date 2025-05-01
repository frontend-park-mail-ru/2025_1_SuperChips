import { toTop } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { findBoardID } from '../lib/findBoardID';
import { boardFeedScroll, boardFeedState, fillBoardFeed } from 'pages/BoardPage';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import './UserPins.scss';


export const UserPins = async (username: string) => {
    boardFeedState.page = 1;
    boardFeedState.own = Auth.userData ? Auth.userData.username === username : false;
    boardFeedState.canEdit = boardFeedState.own;
    boardFeedState.canRemove = false;
    await findBoardID(username);

    const feed = document.querySelector('.profile__feed');
    if (!feed) return;

    feed.innerHTML += `
    <div class="scroll-to-top hidden">
        <img src="/public/icons/arrow-up.svg" alt="scroll to top">
    </div>`;

    setTimeout(async () => {
        const feed = document.querySelector<HTMLElement>('#feed');
        if (!feed) return;
        appState.masonryInstance = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: appState.pinWidth,
                gutter: appState.mobile ? 10 : 20,
            }
        );

        await fillBoardFeed();
    }, 100);

    const scrollButton = feed.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', boardFeedScroll);
};

