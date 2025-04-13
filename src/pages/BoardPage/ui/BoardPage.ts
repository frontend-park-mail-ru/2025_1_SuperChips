import type { IFeed } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { navigate } from 'shared/router';
import { fillBoardFeed } from 'pages/BoardPage';
import { API } from 'shared/api';
import { root } from 'app/app';
import { Auth } from 'features/authorization';
import { USER_OWN_PINS_BOARD } from 'shared/config/constants';
import './BoardPage.scss';
import template from './BoardPage.hbs';


export const boardFeedState = {
    isLoading: false,
    page: 0,
    boardID: '',
    own: false,
    canDelete: false,
    canRemove: false,
};


export const BoardPage = async (boardID: string) => {
    const page = document.createElement('div');
    page.classList.add('board-page');
    boardFeedState.boardID = boardID;
    boardFeedState.page = 1;

    const boardRequest = await API.get(`/api/v1/boards/${boardID}`);
    if (boardRequest instanceof Error || !boardRequest.ok) {
        navigate('feed').finally();
        return page;
    }
    const body = await boardRequest.json();
    if (!body.data) return page;

    boardFeedState.own = Auth.userData ? Auth.userData.id === body.data.author_id : false;
    const own = boardFeedState.own;

    boardFeedState.own = own;
    const config = {
        name: body.data.name,
    };

    if (body.data.name === USER_OWN_PINS_BOARD && own) {
        boardFeedState.canDelete = true;
    } else if (body.data.name === USER_OWN_PINS_BOARD && !own) {
        config.name = `Созданные @${body.data.username}`;
    } else if (own) {
        boardFeedState.canRemove = true;
    }

    page.innerHTML = template(config);

    const delayedFill = new MutationObserver(async () => {
        const feed = document.querySelector<IFeed>('#feed');
        if (!feed) return;
        feed.masonry = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: 205,
                gutter: 20,
            }
        );

        await fillBoardFeed();
        delayedFill.disconnect();
    });

    delayedFill.observe(root, { childList: true });

    return page;
};
