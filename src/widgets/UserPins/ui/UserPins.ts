import type { IFeed } from 'pages/FeedPage';
import { Masonry } from 'shared/models/Masonry';
import { navigate } from 'shared/router';
import { loadUserPictures } from 'features/imageLoader';
import { Pin } from 'entities/Pin';
import { Auth } from 'features/authorization';
import emptyPageTemplate from './emptyPage.hbs';
import './UserPins.scss';


const userPinsState = {
    isLoading: false,
    page: 1,
};


export const UserPins = async (username: string) => {
    const feed = document.querySelector<IFeed>('.profile__feed');
    if (!feed) return;

    const pictures = await loadUserPictures(username);

    if (pictures?.status === 404) {
        feed.masonry?.destroy();
        feed.innerHTML = emptyPageTemplate({ own: Auth.userData ? Auth.userData.username === username : false });

        const btn = feed.querySelector('.go-to-feed');
        btn?.addEventListener('click', () => {
            navigate('feed').finally();
        });

        return;
    } else if (pictures?.status === 503) {
        return;
    }

    if (!pictures?.data) return;

    if (!feed.masonry) {
        feed.masonry = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: 205,
                gutter: 20,
            }
        );
    }

    pictures.data.forEach((item) => {
        feed.appendChild(Pin(item.media_url));
    });
};
