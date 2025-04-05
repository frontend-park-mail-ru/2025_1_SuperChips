// import { API } from 'shared/api/api';

import type { ILoadedPictures } from '../model/types';

export const loadUserPictures = async (username: string): Promise<ILoadedPictures | null> => {
    // const response = await API.get(`api/v1/flow/${username}`);
    // if (response instanceof Error) return page;
    // const pictures = await response.json();

    if (!username)
        return { status: 404, data: undefined };
    else {
        return { status: 404, data: undefined };
    }
};
