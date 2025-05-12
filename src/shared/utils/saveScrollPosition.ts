const SCROLL_POSITION_KEY = 'feed_scroll_position';

export const saveScrollPosition = () => {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem(SCROLL_POSITION_KEY, scrollPosition.toString());
};

export const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
    }
}; 