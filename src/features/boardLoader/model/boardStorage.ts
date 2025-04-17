import { IBoardProps } from 'entities/Board';
import { API } from 'shared/api';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';

class boardStorage {
    boardNames: string[];
    ownBoardList: IBoardProps[];
    visitBoardList: IBoardProps[];
    boardToSave: string;

    constructor() {
        this.boardNames = [];
        this.ownBoardList = [];
        this.visitBoardList = [];
        this.boardToSave = USER_SAVED_PINS_BOARD;
    }

    // Загружает список досок пользователя, сохраняет их в хранилище
    // Если не передается username, то загружаются доски авторизованного пользователя
    async fetchUserBoards(username: string | null = null) {
        const own = !username;

        const URL = own ? '/api/v1/profile/boards' : `/api/v1/users/${username}/boards`;
        const response = await API.get(URL);

        if (response instanceof Response && response.ok) {
            const body = await response.json();

            if (body.data) {
                body.data.forEach((item: IBoardProps) => {
                    item.own = own;
                });
            }

            if (own && body.data) {
                this.ownBoardList = [...body.data];
            } else if (!own && body.data) {
                this.visitBoardList = [...body.data];
            }

            return { status: 200, data: own ? this.ownBoardList : this.visitBoardList };
        } else {
            return { status: 404, data: null };
        }
    }

    // Добавляет доску в хранилище
    addBoard(board: IBoardProps) {
        this.ownBoardList.push(board);
    }

    //  Удаляет доску из хранилища
    removeBoard(boardID: number) {
        const index = this.ownBoardList.findIndex(item => item.id === boardID);
        if (index > -1) {
            this.ownBoardList.splice(index, 1);
        }
    }

    // Изменяет свойства доски в хранилище
    updateBoard(boardID: number, newBoardProps: Partial<IBoardProps>) {
        const index = this.ownBoardList.findIndex(item => item.id === boardID);
        if (index > -1) {
            this.ownBoardList[index] = { ...this.ownBoardList[index], ...newBoardProps };
        }
    }

    // Вовращает доску из хранлища по ID
    getBoard(boardID: number) {
        return this.ownBoardList.find((item) => item.id === Number(boardID));
    }

    // Вовращает список имен досок в хранилище
    getBoardNames() {
        return this.ownBoardList.map(item => item.name);
    }

    // Ищет ID доски по названию
    getIDbyName(boardName: string) {
        if (boardName === 'Мои flow') {
            boardName = USER_SAVED_PINS_BOARD;
        }
        const board = this.ownBoardList.find((item) => item.name === boardName);
        return board ? board.id : null;
    }

    // Очищает хранилище
    clear() {
        this.ownBoardList = [];
        this.visitBoardList = [];
        this.boardToSave = '';
    }
}

export const BoardStorage = new boardStorage();
