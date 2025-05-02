import { appState, navigate } from 'shared/router';
import { clearSearch } from './clearSearch';

export const goToFeed = async (event: Event) => {
    event.preventDefault();
    if (appState.activePage === 'feed') {
        clearSearch().finally();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        navigate('feed').finally();
    }
};
