import type { IFeed } from 'pages/FeedPage';
import type { IBoardProps } from 'entities/Board';
import { Masonry } from 'shared/models/Masonry';
import { userFeedScroll } from '../handlers/userFeedScroll';
import { fillUserFeed } from '../lib/fillUserFeed';
import { toTop } from 'pages/FeedPage';
import { API } from 'shared/api';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { Auth } from 'features/authorization';
import './UserPins.scss';


export const userFeedState = {
    isLoading: false,
    page: 0,
    boardID: '',
    own: false,
};

export const UserPins = async (username: string) => {
    userFeedState.page = 1;
    userFeedState.own = Auth.userData ? Auth.userData.username === username : false;
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

    await fillUserFeed();

    const scrollButton = feed.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', userFeedScroll);
};


const findBoardID = async (username: string) => {
    const boardListRequest = await API.get(`/api/v1/users/${username}/boards`);
    if (boardListRequest instanceof Error || !boardListRequest.ok) return { status: 404 };

    const boardListBody = await boardListRequest.json();
    if (!boardListBody.data) return;

    const boardList = (boardListBody.data);
    const board = boardList.find((item: IBoardProps) => item.name === USER_SAVED_PINS_BOARD);
    if (board) {
        userFeedState.boardID = board.id;
    }
};
