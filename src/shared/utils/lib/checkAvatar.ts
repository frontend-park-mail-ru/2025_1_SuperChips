import { API } from 'shared/api';

export const checkAvatar = async (url: string | undefined) => {
    if (!url) return false;
    const avatar = await API.head(url);
    return !(avatar instanceof Error || !avatar.ok);
};
