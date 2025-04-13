import type { IFeed } from 'pages/FeedPage';
import { toTop } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { findBoardID } from '../lib/findBoardID';
import { Auth } from 'features/authorization';
import { boardFeedScroll, boardFeedState, fillBoardFeed } from 'pages/BoardPage';
import './UserPins.scss';


export const UserPins = async (username: string) => {
    boardFeedState.page = 1;
    boardFeedState.own = Auth.userData ? Auth.userData.username === username : false;
    await findBoardID(username);

    const feed = document.querySelector<IFeed>('.profile__feed');
    if (!feed) return;

    feed.innerHTML += `
    <div class="scroll-to-top hidden">
        <img src="/public/icons/arrow-up.svg" alt="scroll to top">
    </div>`;

    if (!feed.masonry) {
        feed.masonry = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: 205,
                gutter: 20,
            }
        );
    }

    await fillBoardFeed();

    const scrollButton = feed.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', boardFeedScroll);
};

