import { toTop } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { fillBoardFeed } from '../lib/fillBoardFeed';
import { openBoardSettings } from 'widgets/BoardSettings';
import { registerScrollHandler } from 'features/scrollHandler';
import { API } from 'shared/api';
import { root } from 'app/app';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import { USER_OWN_PINS_BOARD, USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import './BoardPage.scss';
import template from './BoardPage.hbs';


export const boardFeedState = {
    isLoading: false,
    page: 0,
    boardID: '',
    own: false,
    canRemove: false,
    canEdit: false,
};

const DEFAULT_GRADIENT = ['#FFA500', '#32CD32', '#1E90FF', '#FF69B4'];

export const BoardPage = async (boardID: string) => {
    const page = document.createElement('div');
    page.classList.add('board-page');
    boardFeedState.boardID = boardID;
    boardFeedState.page = 1;

    const boardRequest = await API.get(`/boards/${boardID}`);
    if (boardRequest instanceof Error || !boardRequest.ok) {
        return null;
    }
    const body = await boardRequest.json();
    if (!body.data) return page;

    const own = Auth.userData ? Auth.userData.id === body.data.author_id : false;
    boardFeedState.own = own;

    const config = {
        name: body.data.name,
        mutable: boardFeedState.own && body.data.name !== USER_OWN_PINS_BOARD && body.data.name !== USER_SAVED_PINS_BOARD,
    };

    if (!own && config.name === USER_SAVED_PINS_BOARD) {
        config.name = config.name + ` @${body.data.author_username}`;
    }

    boardFeedState.canEdit = body.data.name === USER_OWN_PINS_BOARD && own;
    boardFeedState.canRemove = body.data.name !== USER_OWN_PINS_BOARD && own;

    if (body.data.name === USER_OWN_PINS_BOARD && !own) {
        config.name = `Созданные @${body.data.author_username}`;
    }

    page.innerHTML = template(config);

    const delayedFill = new MutationObserver(async () => {
        const feed = document.querySelector<HTMLElement>('#feed');
        if (!feed) return;
        appState.masonryInstance = new Masonry(
            feed, {
                itemSelector: '.pin',
                gutter: appState.mobile ? 10 : 20,
            }
        );

        await fillBoardFeed();
        delayedFill.disconnect();
    });

    delayedFill.observe(root, { childList: true });

    registerScrollHandler(fillBoardFeed);

    const scrollButton = page.querySelector<HTMLDivElement>('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    const settingsButton = page.querySelector('.board__settings-button');
    settingsButton?.addEventListener('click', openBoardSettings);

    const divider = page.querySelector<HTMLElement>('.divider');
    if (divider) {
        const colors = body.data.gradient
            ? body.data.gradient
            : DEFAULT_GRADIENT;

        colors.forEach((color: string | null, i: number) => {
            divider.style.setProperty(`--color-${i + 1}`, color);
        });

        divider.classList.add('visible');
    }

    return page;
};
