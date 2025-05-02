import { config } from 'shared/config/router';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { appState } from './router';

export const findMatch = async (page: string) => {
    let match = null;

    for (const [key, route] of Object.entries(config.menu)) {
        if (typeof route.href === 'string' && route.href.slice(1) === page) {
            match = key;
            break;
        } else if (route.href instanceof RegExp && route.href.test(page)) {
            match = key;
            break;
        }
    }

    if (
        !match ||
        config.menu[match].nonAuthOnly && !!Auth.userData ||
        config.menu[match].authOnly && !Auth.userData
    ) {
        match = 'feed';
    }

    if (match === 'profile') {
        match = 'profileBoards';
    }

    if (match === 'profile' || match === 'profilePins' || match === 'profileBoards') {
        const username = page.split('/')[0];
        if (username === appState.lastVisited.username) return match;

        const userExists = await API.head(`/users/${username}`);
        if (userExists instanceof Error || !userExists.ok) {
            match = 'feed';
        }
    }

    return match;
};
