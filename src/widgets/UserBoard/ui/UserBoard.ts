import type { IFeed } from 'pages/FeedPage';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { fetchUserBoards } from 'features/boardLoader';
import { BoardPopup } from 'widgets/BoardPopup';
import { Auth } from 'features/authorization';
import { USER_OWN_PINS_BOARD, USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import emptyPageTemplate from './emptyPage.hbs';
import './UserBoard.scss';


export const UserBoard = async (username: string) => {
    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;
    feed.style.height = 'auto';

    const boards = await fetchUserBoards(username);

    if (boards?.status === 404 || !boards?.data) {
        feed.innerHTML = emptyPageTemplate({ own: Auth.userData ? Auth.userData.username === username : false });

        const createBoardButton = feed.querySelector('.empty-page__create-board');
        createBoardButton?.addEventListener('click', () => BoardPopup('create'));
        return;
    }

    if (!boards?.data) return;

    boards.data.forEach((board: IBoardProps) => {
        if (board.name === USER_OWN_PINS_BOARD) {
            feed.insertBefore(Board({ ...board, permanent: true }), feed.firstChild);
        } else if (board.name !== USER_SAVED_PINS_BOARD) {
            feed.appendChild(Board(board));
        }
    });
    return;
};
