import { config } from 'shared/config/router';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';

export const findMatch = async (page: string) => {
    let match = null;

    if (page === '') {
        return 'feed';
    }

    for (const [key, route] of Object.entries(config.menu)) {
        if (typeof route.href === 'string' && route.href.slice(1) === page) {
            match = key;
            break;
        } else if (route.href instanceof RegExp && route.href.test(page)) {
            match = key;
            break;
        }
    }

    if (!match) {
        match = 'notFound';
    } else if (
        (config.menu[match].nonAuthOnly && !!Auth.userData) ||
        (config.menu[match].authOnly && !Auth.userData)
    ) {
        match = 'feed';
    }

    if (match === 'profile') {
        match = 'profileBoards';
    }

    if (match === 'profile' || match === 'profilePins' || match === 'profileBoards') {
        const username = page.split('/')[0];

        const userExists = await API.head(`/users/${username}`);
        if (userExists instanceof Error || !userExists.ok) {
            match = 'notFound';
        }
    }

    if (match === 'board') {
        const board = page.split('/')[1];
        const boardExists = await API.get(`/boards/${board}`);
        if (boardExists instanceof Error || !boardExists.ok) {
            match = 'notFound';
        }
    }

    if (match === 'pin') {
        const pin = page.split('/')[1].split('?')[0];

        const pinExists = await API.get(`/flows?id=${pin}`);
        if (pinExists instanceof Error || !pinExists.ok) {
            match = 'notFound';
        }
    }

    return match;
};
