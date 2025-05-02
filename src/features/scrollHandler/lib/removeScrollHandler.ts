import { appState } from 'shared/router';


export const removeScrollHandler = () => {
    if (appState.scrollHandler) {
        window.removeEventListener('scroll', appState.scrollHandler);
        appState.scrollHandler = null;
    }
};
