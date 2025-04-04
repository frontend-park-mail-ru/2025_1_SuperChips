import './Desk.scss';
import DeskTemplate from './Desk.hbs';
import { pluralize } from 'shared/utils';
import { editDesk } from '../handlers/editDesk';
import { deleteDesk } from '../handlers/deleteDesk';
import { toggleIcons } from '../handlers/togleIcons';

export interface IDeskProps {
    own: boolean
    id: string,
    name: string,
    count: number | string,
    preview: string[],
}

/**
 * В параметрах передается id доски, название доски, количество пинов в ней и не более трех картинок для превью
 */
export const Desk = (config: IDeskProps) => {
    const container = document.createElement('div');

    for (let i = 0; i < 3; i++) {
        if (!config.preview[i]) config.preview[i] = '';
    }

    config.count = pluralize('пин', Number(config.count));
    container.innerHTML = DeskTemplate(config);

    const preview = container.querySelector('.desk-container__preview');
    preview?.addEventListener('mouseenter', toggleIcons);
    preview?.addEventListener('mouseleave', toggleIcons);


    const pen = container.querySelector<HTMLImageElement>('.preview__icon-edit');
    if (pen) {
        pen.addEventListener('click', editDesk);
        pen.id = `edit-${config.id}`;
    }

    const bin = container.querySelector<HTMLImageElement>('.preview__icon-delete');
    if (bin) {
        bin.addEventListener('click', deleteDesk);
        bin.id = `delete-${config.id}`;
    }

    return container.firstChild;
};
