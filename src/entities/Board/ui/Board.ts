import './Board.scss';
import BoardTemplate from './Board.hbs';
import { pluralize } from 'shared/utils';
import { editBoard } from '../handlers/editBoard';
import { deleteBoard } from '../handlers/deleteBoard';
import { toggleIcons } from '../handlers/togleIcons';

export interface IBoardProps {
    own: boolean
    id: string,
    name: string,
    count: number | string,
    preview: string[],
}

/**
 * В параметрах передается id доски, название доски, количество пинов в ней и не более трех картинок для превью
 */
export const Board = (config: IBoardProps) => {
    const container = document.createElement('div');

    for (let i = 0; i < 3; i++) {
        if (!config.preview[i]) config.preview[i] = '';
    }

    config.count = pluralize('пин', Number(config.count));
    container.innerHTML = BoardTemplate(config);

    const preview = container.querySelector('.board-container__preview');
    preview?.addEventListener('mouseenter', toggleIcons);
    preview?.addEventListener('mouseleave', toggleIcons);


    const pen = container.querySelector<HTMLImageElement>('.preview__icon-edit');
    if (pen) {
        pen.addEventListener('click', editBoard);
        pen.id = `edit-${config.id}`;
    }

    const bin = container.querySelector<HTMLImageElement>('.preview__icon-delete');
    if (bin) {
        bin.addEventListener('click', deleteBoard);
        bin.id = `delete-${config.id}`;
    }

    return container.firstChild;
};
