import { navigate } from 'shared/router';
import { API } from 'shared/api/api';
import emptyPageTemplate from './emptyPage.hbs';
import './UserPins.scss';

export const UserPins = async (username: string): Promise<HTMLDivElement> => {
    const page = document.createElement('div');
    // const config = {
    //     author: Auth.userData.publicName,
    //     username: Auth.userData.username,
    //     author_pfp: Auth.userData.avatar,
    // };

    // if (!params) {
    //     params = {
    //         author: Auth.userData.publicName,
    //         username: Auth.userData.username,
    //         author_pfp: Auth.userData.avatar,
    //     };
    // }

    const response = await API.get(`api/v1/profile/${username}`);
    if (response instanceof Error) return page;
    const images = await response.json();
    if (!images) {
        page.innerHTML = emptyPageTemplate({});

        const btn = page.querySelector('.go-to-feed');
        btn?.addEventListener('click', () => {
            navigate('feed').finally();
        });
    } else {
        const feed = document.querySelector('#feed');

        // логика для заполнения пользовательского фида
    }

    return page.firstElementChild as HTMLDivElement;
};
