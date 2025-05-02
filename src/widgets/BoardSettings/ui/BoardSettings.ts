import { navigate } from 'shared/router';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import { closeBoardSettings } from '../handlers/closeBoardSettings';
import { confirmBoardDelete } from '../handlers/confirmBoardDelete';
import { BoardStorage } from 'features/boardLoader';
import { Auth } from 'features/authorization';
import template from './BoardSettings.hbs';
import './BoardSettings.scss';
import { updateBoard } from '../handlers/updateBoard';


export const BoardSettings = () => {
    const settings = document.createElement('div');
    settings.id = 'board-settings';
    const config = {};

    settings.innerHTML = template(config);

    const inputPlaceholder = settings.querySelector('.input-placeholder');
    if (inputPlaceholder) {
        inputPlaceholder.replaceWith(Input({
            type: 'text',
            id: 'board-name',
            inputLabel: 'Название доски',
            errorMessage: '',
            maxlength: 63,
        }));
    }

    const togglePlaceholder = settings.querySelector('.toggle-placeholder');
    if (togglePlaceholder) {
        togglePlaceholder.replaceWith(Toggle('isPrivate'));
    }

    const closeButton = settings.querySelector('.board-settings__close-button');
    closeButton?.addEventListener('click', closeBoardSettings);

    const boardName = document.querySelector('#header')?.textContent?.trim();
    const board = BoardStorage.getBoardByName(boardName);
    if (!board) return;

    const inputField = settings.querySelector('input');
    const checkbox = settings.querySelector<HTMLInputElement>('#isPrivate');

    if (board && inputField) {
        inputField.value = board.name;
    }

    if (board && checkbox) {
        checkbox.checked = board.is_private;
    }

    const deleteButton = settings.querySelector('.board-settings__delete-button');
    deleteButton?.addEventListener('click', () => {
        confirmBoardDelete(board.id)
            .then(() => navigate(`${Auth?.userData?.username}/boards`, true).finally())
            .catch(() => {
            });
    });

    const submitButton = settings.querySelector('.board-settings__submit-button');
    submitButton?.addEventListener('click', updateBoard);

    return settings;
};
