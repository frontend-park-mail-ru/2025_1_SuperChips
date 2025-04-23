import { config } from 'shared/config/router';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { appState } from './router';
// import { parseQuery } from 'shared/utils';
// import * as VKID from '@vkid/sdk';

export const findMatch = async (page: string) => {
    // const query = parseQuery(window.location.href);
    // if (query?.code && query?.device_id) {
    // }

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

    // TODO когда на бэке будет HEAD (`/api/v1/users/${page}`) заменить проверку на него вместо GET
    if (match === 'profile' || match === 'profilePins' || match === 'profileBoards') {
        const username = page.split('/')[0];
        if (username === appState.lastVisited.username) return match;

        const userExists = await API.get(`/api/v1/users/${username}`);
        if (userExists instanceof Error || !userExists.ok) {
            match = 'feed';
        }
    }

    return match;
};
