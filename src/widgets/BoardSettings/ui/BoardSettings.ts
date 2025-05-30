import { navigate } from 'shared/router';
import { Input } from 'shared/components/input';
import { Toggle } from 'shared/components/toggle';
import { closeBoardSettings } from '../handlers/closeBoardSettings';
import { confirmBoardDelete } from '../handlers/confirmBoardDelete';
import { InvitePopup } from 'widgets/InvitePopup';
import { LinkManagement } from 'widgets/LinkManagement';
import { updateBoard } from '../handlers/updateBoard';
import { Toast } from 'shared/components/Toast';
import { CoauthorCard } from 'entities/CoauthorCard';
import { BoardStorage } from 'features/boardLoader';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import template from './BoardSettings.hbs';
import './BoardSettings.scss';


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

    const deleteButton = settings.querySelector('#board-settings__delete-button');
    deleteButton?.addEventListener('click', () => {
        confirmBoardDelete(board.id)
            .then(() => navigate(`${Auth?.userData?.username}/boards`, true).finally())
            .catch(() => {
            });
    });

    const submitButton = settings.querySelector('.board-settings__submit-button');
    submitButton?.addEventListener('click', updateBoard);

    settings.querySelector('#invite')?.addEventListener('click', () => InvitePopup(board.id));

    loadCoauthors(board.id, settings).finally();

    const linkManageButton = settings.querySelector('#links');
    linkManageButton?.addEventListener('click', async () => {
        const linkManageWidget = await LinkManagement(board.id);
        if (linkManageWidget) {
            document.querySelector('#root')?.appendChild(linkManageWidget);
        }
    });

    return settings;
};


const loadCoauthors = async (boardId: number, container: HTMLElement) => {
    const response = await API.get(`/boards/${boardId}/coauthors`);

    if (!(response instanceof Response && response.ok)) {
        Toast('Ошибка при загрузке соавторов', 'error');
        return;
    }

    const body = await response.json();
    const coauthorsList = container.querySelector('#coauthors-list');

    if (!coauthorsList) return;

    // Clear existing coauthors
    coauthorsList.innerHTML = '';

    if (body?.data?.names.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'У этой доски пока нет соавторов';
        emptyMessage.style.color = '#999';
        emptyMessage.style.padding = '10px 0';
        coauthorsList.appendChild(emptyMessage);
        return;
    }

    // Render all coauthors
    if (!body.data?.names) return;
    body.data.names.forEach((coauthor: string) => {
        const coauthorCard = CoauthorCard({
            username: coauthor,
            avatar: '', // API doesn't provide avatar information
            isCreator: false,
            boardId: boardId,
            userId: coauthor,
            onRemove: () => loadCoauthors(boardId, container) // Reload coauthors after removal
        });

        if (coauthorCard) {
            coauthorsList.appendChild(coauthorCard);
        }
    });
};
