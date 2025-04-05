import { Input } from 'shared/components/input';
import { toggleScroll } from '../lib/toggleScroll';
import { closePopup } from '../handlers/closePopup';
import { debouncedInputHandler } from '../handlers/inputHandler';
import { root } from 'app/app';
import template from './BoardPopup.hbs';
import './BoardPopup.scss';


export type TPopupType = 'edit' | 'delete' | 'create';


export const BoardPopup = (type: TPopupType, boardName: string | null = null) => {
    toggleScroll('disabled');

    const config = {
        header: '',
        buttonText: '',
        create: false,
        type: type,
    };

    if (type === 'edit') {
        config.header = 'Изменение доски';
        config.buttonText = 'Изменить доску';
    } else if (type === 'delete') {
        config.header = 'Удаление доски';
        config.buttonText = 'Удалить доску';
    } else if (type === 'create') {
        config.header = 'Создание доски';
        config.buttonText = 'Создать доску';
        config.create = true;
    }

    const popup = document.createElement('div');
    popup.innerHTML = template(config);

    const input = popup.querySelector<HTMLInputElement>('.input-placeholder');
    const newInput = Input({
        type: 'text',
        id: 'board-name',
        inputLabel: config.create ? 'Название новой доски' : 'Название доски',
        errorMessage: 'Такая доска уже существует',
        maxlength: 120,
    });
    if (newInput) input?.replaceWith(newInput);

    newInput?.addEventListener('input', () => {
        debouncedInputHandler(type, boardName);
    });


    const background = popup.querySelector<HTMLDivElement>('.black-background');
    const cross = popup.querySelector<HTMLImageElement>('.popup__close');

    cross?.addEventListener('click', closePopup);
    background?.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopup);

    root.appendChild(popup);
};
