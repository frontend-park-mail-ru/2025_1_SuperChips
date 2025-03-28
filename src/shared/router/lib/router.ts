import { root } from 'app/app';
import { config } from 'shared/config/router';
import { debouncedScroll } from 'pages/FeedPage';
import { User } from 'entities/User';
import { Navbar } from '../../../widgets/navbar';
import { Sidebar } from '../../../widgets/sidebar';

interface AppState {
    activePage: string | null,
    isLoadingFeed: boolean,
}

export const appState: AppState = {
    activePage: null,
    isLoadingFeed: false,
};


/**
 * Переходит на указанный URL (прим: '/feed', '/login')
 * Если replace = true, создает новую запись в истории
 */
export const navigate = async (
    page: string,
    replace = false
): Promise<void> => {
    if (root === null) { return; }
    root.innerHTML = '';

    if ((!(page in config.menu)) || (config.menu[page]?.nonAuthOnly && User.authorized())) {
        page = 'feed';
    }

    if (appState.activePage === 'feed' && page !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = page;

    const element = await config.menu[page].render();
    root.appendChild(element);

    const navbar = root.querySelector<HTMLDivElement>('.navbar');
    const showNavbar = config.menu[page].hasNavbar;
    console.log('navbar: ', showNavbar);
    // navbar.style.display = showNavbar ? 'flex' : 'none';
    if (navbar) navbar.classList.toggle('hidden', !showNavbar);

    const sidebar = root.querySelector<HTMLDivElement>('.sidebar');
    const showSidebar = config.menu[page].hasSidebar && User.authorized();
    if (sidebar) sidebar.classList.toggle('hidden', !showSidebar);
    // if (sidebar) {
    //     const showSidebar = config.menu[page].hasSidebar && User.authorized();
    //     sidebar.style.display = showSidebar ? 'flex' : 'none';
    // }
    console.log('sidebar: ', showSidebar);


    window.scrollTo({ top: 0 });
    document.title = config.menu[page].title;

    if (replace) {
        history.replaceState({ page: page }, '', config.menu[page].href);
    } else {
        history.pushState({ page: page }, '', config.menu[page].href);
    }
};
