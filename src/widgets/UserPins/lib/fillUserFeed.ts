import type { IPinProps } from 'entities/Pin/model/types';
import { loadUserPictures } from 'features/imageLoader';
import { navigate } from 'shared/router';
import { Pin } from 'entities/Pin';
import { userFeedScroll } from '../handlers/userFeedScroll';
import { findBoardIDbyName } from 'entities/Pin';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { userFeedState } from '../ui/UserPins';
import emptyPageTemplate from '../ui/emptyPage.hbs';


export const fillUserFeed = async () => {
    const feed = document.querySelector('#feed');
    if (!feed) return;

    const pictures = await loadUserPictures(userFeedState.page, userFeedState.boardID);
    const own = userFeedState.own;

    if (pictures?.status === 404 && userFeedState.page === 1) {
        feed.innerHTML = emptyPageTemplate({ own: own });

        const btn = feed.querySelector('.go-to-feed');
        btn?.addEventListener('click', () => {
            navigate('feed').finally();
        });
    }

    if (pictures?.status === 404) {
        window.removeEventListener('scroll', userFeedScroll);
        return;
    }

    if (!pictures?.data) return;

    const id = own ? findBoardIDbyName(USER_SAVED_PINS_BOARD) : null;

    pictures.data.forEach((item) => {
        const config: IPinProps = {
            url: item.media_url,
            pinID: item.flow_id,
            saved: own,
            onBoard: true,
            boardID: id,
            canRemove: own,
        };
        feed.insertBefore(Pin(config), feed.firstChild);
    });
    userFeedState.page++;
};

