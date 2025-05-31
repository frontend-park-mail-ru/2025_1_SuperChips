import { scrollHandler } from './scrollHandler';
import { throttle } from 'shared/utils';
import { appState } from 'shared/router';


export const registerScrollHandler = (filler: () => Promise<void | undefined | null>) => {
    const handler = throttle((() => scrollHandler(filler)), 150);

    if (appState.scrollHandler) {
        window.removeEventListener('scroll', appState.scrollHandler);
    }

    window.addEventListener('scroll', handler);
    appState.scrollHandler = handler;
};
