import type { ILoadedPictures } from '../model/types';

export const loadUserPictures = async (username: string): Promise<ILoadedPictures | null> => {
    if (!username)
        return { status: 404, data: undefined };
    else {
        return { status: 404, data: undefined };
    }
};
