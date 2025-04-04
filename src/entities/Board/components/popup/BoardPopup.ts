import './BoardPopup.scss';
import template from './BoardPopup.hbs';
import { Input } from 'shared/components/input';
import { root } from 'app/app';

type TPopupType = 'edit' | 'delete';

export const BoardPopup = (type: TPopupType) => {
    let header;
    let buttonText;

    if (type === 'edit') {
        header = 'Изменение доски';
        buttonText = 'Изменить доску';
    } else if (type === 'delete') {
        header = 'Удаление доски';
        buttonText = 'Удалить доску';
    }

    const popup = document.createElement('div');
    popup.innerHTML = template({ header: header, type: type, buttonText: buttonText });

    const input = popup.querySelector<HTMLInputElement>('.input-placeholder');
    const newInput = Input({
        type: 'text',
        id: 'board-name',
        inputLabel: 'Название доски',
        errorMessage: 'Такая доска уже существует',
        maxlength: 120,
    });
    if (newInput) input?.replaceWith(newInput);

    const cross = popup.querySelector<HTMLImageElement>('.popup__close');
    cross?.addEventListener('click', closePopup);

    root.appendChild(popup);
};


const closePopup = () => {
    const cross = document.querySelector<HTMLImageElement>('.popup__close');
    cross?.removeEventListener('click', closePopup);

    const popup = document.querySelector('.popup');
    popup?.remove();

    const background = document.querySelector('.black-background');
    background?.remove();
};
