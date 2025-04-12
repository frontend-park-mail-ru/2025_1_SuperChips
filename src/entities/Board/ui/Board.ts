import type { IBoardProps } from '../model/types';
import { pluralize } from 'shared/utils';
import { toggleIcons } from '../handlers/togleIcons';
import { BoardPopup } from 'widgets/BoardPopup';
import BoardTemplate from './Board.hbs';
import './Board.scss';


/**
 * В параметрах передается id доски, название доски, количество пинов в ней и не более трех картинок для превью
 */
export const Board = (params: IBoardProps) => {
    const container = document.createElement('div');

    const config = {
        ...params,
        preview: ['', '', ''],
    };

    const min = params?.preview ? params.preview.length : 0;
    for (let i = 0; i < min; i++) {
        if (params.preview[i]) {
            config.preview[i] = (params.preview[i].media_url);
        }
    }

    config.flow_count = pluralize('пин', Number(config.flow_count));
    container.innerHTML = BoardTemplate(config);

    const preview = container.querySelector('.board-container__preview');
    preview?.addEventListener('mouseenter', () => {
        toggleIcons(config.id);
    });
    preview?.addEventListener('mouseleave', () => {
        toggleIcons(config.id);
    });


    const pen = container.querySelector<HTMLImageElement>('.preview__icon-edit');
    if (pen) {
        pen.addEventListener('click', () => BoardPopup('edit', config.id));
        pen.id = `edit-${config.id}`;
    }

    const bin = container.querySelector<HTMLImageElement>('.preview__icon-delete');
    if (bin) {
        bin.addEventListener('click', () => BoardPopup('delete', config.id, config.name));
        bin.id = `delete-${config.id}`;
    }

    return container.firstChild as HTMLDivElement;
};
