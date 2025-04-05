import { appState, navigate } from 'shared/router';

export const goToFeed = (event: Event) => {
    event.preventDefault();
    if (appState.activePage === 'feed') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        navigate('feed').finally();
    }
};
