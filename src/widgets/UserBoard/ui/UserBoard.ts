import type { IFeed } from 'pages/FeedPage';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { Auth } from 'features/authorization';
import emptyPageTemplate from './emptyPage.hbs';
import './UserBoard.scss';
import { loadUserBoards } from 'features/boardLoader';
import { BoardPopup } from 'widgets/BoardPopup';


export const UserBoard = async (username: string) => {
    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    const boards = await loadUserBoards(username);


    if (boards?.status === 404 || !boards?.data) {
        feed.innerHTML = emptyPageTemplate({ own: Auth.userData ? Auth.userData.username === username : false });

        const createBoardButton = feed.querySelector('.empty-page__create-board');
        createBoardButton?.addEventListener('click', () => BoardPopup('create'));
        return;
    }

    if (!boards?.data) return;


    boards.data.forEach((board: IBoardProps) => {
        feed.appendChild(Board(board));
    });

    return;
};
