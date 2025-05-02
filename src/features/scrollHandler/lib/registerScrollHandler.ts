import { scrollHandler } from './scrollHandler';
import { debounce } from 'shared/utils';
import { appState } from 'shared/router';


export const registerScrollHandler = (filler: () => Promise<void | undefined | null>) => {
    const handler = debounce((() => scrollHandler(filler)), 75);

    if (appState.scrollHandler) {
        window.removeEventListener('scroll', appState.scrollHandler);
    }

    window.addEventListener('scroll', handler);
    appState.scrollHandler = handler;
};
