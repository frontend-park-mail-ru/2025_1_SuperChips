import { Input } from 'shared/components/input';
import { toggleScroll } from '../lib/toggleScroll';
import { closePopup } from '../handlers/closePopup';
import { debouncedInputHandler } from '../handlers/inputHandler';
import { createBoard } from '../handlers/createBoard';
import { deleteBoard } from '../handlers/deleteBoard';
import { editBoard } from '../handlers/editBoard';
import { root } from 'app/app';
import template from './BoardPopup.hbs';
import './BoardPopup.scss';


export type TPopupType = 'edit' | 'delete' | 'create';


export const BoardPopup = (type: TPopupType, boardID: string | null = null, boardName: string | null = null) => {
    toggleScroll('disabled');

    const config = {
        create: {
            header: 'Создание доски',
            buttonText: 'Создание доски',
            inputLabel: 'Название новой доски',
            create: true,
            type: 'create',
            handler: createBoard,
        },
        edit: {
            header: `Изменение доски ${boardName}`,
            buttonText: 'Изменить доску',
            inputLabel: 'Новое название доски',
            edit: true,
            type: 'edit',
            handler: boardID ? () => editBoard(boardID) : () => {
            },
        },
        delete: {
            header: `Удаление доски ${boardName}`,
            buttonText: 'Удалить доску',
            inputLabel: `Введите "${boardName}" чтобы удалить доску`,
            type: 'delete',
            delete: true,
            handler: boardID ? () => deleteBoard(boardID) : () => {
            },
        }
    };

    const popup = document.createElement('div');
    popup.innerHTML = template(config[type]);

    const input = popup.querySelector<HTMLInputElement>('.input-placeholder');
    const newInput = Input({
        type: 'text',
        id: 'board-name',
        inputLabel: config[type].inputLabel,
        errorMessage: '',
        maxlength: 120,
    });
    if (newInput) input?.replaceWith(newInput);

    newInput?.addEventListener('input', () => {
        debouncedInputHandler(type, boardName);
    });


    const cross = popup.querySelector<HTMLImageElement>('.popup__close');

    cross?.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopup);
    setTimeout(() => {
        document.addEventListener('click', closePopup);
    }, 0);

    const button = popup.querySelector<HTMLButtonElement>('#popup-button');
    button?.addEventListener('click', config[type].handler);

    root.appendChild(popup);
};
