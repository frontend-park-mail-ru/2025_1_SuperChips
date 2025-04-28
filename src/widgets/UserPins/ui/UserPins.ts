import { IFeed, toTop } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { findBoardID } from '../lib/findBoardID';
import { boardFeedScroll, boardFeedState, fillBoardFeed } from 'pages/BoardPage';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import { PIN_WIDTH, PIN_WIDTH_MOBILE } from 'shared/config/constants';
import './UserPins.scss';


export const UserPins = async (username: string) => {
    boardFeedState.page = 1;
    boardFeedState.own = Auth.userData ? Auth.userData.username === username : false;
    boardFeedState.canEdit = boardFeedState.own;
    boardFeedState.canRemove = !boardFeedState.own;
    await findBoardID(username);

    const feed = document.querySelector<IFeed>('.profile__feed');
    if (!feed) return;

    feed.innerHTML += `
    <div class="scroll-to-top hidden">
        <img src="/public/icons/arrow-up.svg" alt="scroll to top">
    </div>`;

    // const delayedFill = new MutationObserver(async () => {
    setTimeout(async () => {
        const feed = document.querySelector<IFeed>('#feed');
        if (!feed) return;
        feed.masonry = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: appState.mobile ? PIN_WIDTH_MOBILE : PIN_WIDTH,
                gutter: 20,
            }
        );

        await fillBoardFeed();
    }, 100);

    const scrollButton = feed.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', boardFeedScroll);
};

