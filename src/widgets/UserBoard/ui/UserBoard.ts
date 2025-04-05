import type { IFeed } from 'pages/FeedPage';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { createNewBoard } from 'pages/ProfilePage';
import { Auth } from 'features/authorization';
import emptyPageTemplate from './emptyPage.hbs';
import './UserBoard.scss';

interface IBoardsList {
    status: number,
    data: IBoardProps[];
}


export const UserBoard = async (username: string) => {
    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    // Пример пустой страницы
    const boards = {
        status: 404,
        data: []
    };


    if (boards?.status === 404) {
        feed.innerHTML = emptyPageTemplate({ own: Auth.userData ? Auth.userData.username === username : false });

        const createBoardButton = feed.querySelector('.empty-page__create-board');
        createBoardButton?.addEventListener('click', createNewBoard);
    }

    if (!boards?.data) return;

    boards.data.forEach((board: IBoardProps) => {
        feed.appendChild(Board(board));
    });

    return;
};
