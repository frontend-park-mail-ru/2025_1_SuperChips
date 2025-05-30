import type { IBoardProps } from '../model/types';
import { pluralize } from 'shared/utils';
import { BoardPopup } from 'widgets/BoardPopup';
import { appState, navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import BoardTemplate from './Board.hbs';
import './Board.scss';


/**
 * В параметрах передается id доски, название доски, количество пинов в ней и не более трех картинок для превью
 */
export const Board = (params: IBoardProps) => {
    const container = document.createElement('div');

    const isAuthor = Auth.userData?.id === params?.author_id;

    const config = {
        ...params,
        preview: ['', '', ''],
        is_private: params.is_private && params.own,
        mutable: params.own && !params.permanent && isAuthor,
        flowCountPluralized: '',
        mobile: appState.mobile,
    };

    const min = params?.preview ? params.preview.length : 0;
    for (let i = 0; i < min; i++) {
        if (params.preview[i]) {
            const URL = 'https://yourflow.ru/static/img/';
            if (!params.preview[i].media_url.includes(URL)) {
                params.preview[i].media_url = URL + params.preview[i].media_url;
            }
            config.preview[i] = (params.preview[i].media_url);
        }
    }

    config.flowCountPluralized = pluralize('пин', Number(config.flow_count));

    container.innerHTML = BoardTemplate(config);

    const pen = container.querySelector<HTMLImageElement>('.preview__icon-edit');
    if (pen) {
        pen.addEventListener('click', (event) => {
            event.stopPropagation();
            BoardPopup('edit', config.id);
        });
        pen.id = `edit-${config.id}`;
    }

    const bin = container.querySelector<HTMLImageElement>('.preview__icon-delete');
    if (bin) {
        bin.addEventListener('click', (event) => {
            event.stopPropagation();
            BoardPopup('delete', config.id, config.name);
        });
        bin.id = `delete-${config.id}`;
    }

    const preview = container.firstChild as HTMLDivElement;
    preview?.addEventListener('click', () => {
        navigate(`board/${config.id}`).finally();
    });

    return container.firstChild as HTMLDivElement;
};
