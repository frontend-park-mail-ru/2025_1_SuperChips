import type { Route } from 'shared/config/router';
import { closeChatList, openChatList } from 'widgets/sidebar';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import { closeFilter, openFilter } from 'widgets/navbar';


export const updateBars = (route: Route) => {
    const navbar = document.querySelector<HTMLDivElement>('.navbar');
    const showNavbar = !route.noNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = !route.noSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.querySelector<HTMLButtonElement>('#go-back-button');
    const showBackButton = !route.noBackButton;

    if (appState.mobile && backButton) {
        backButton.classList.toggle('sidebar-button_disabled', !showBackButton);
        backButton.disabled = !showBackButton;
    } else {
        backButton?.classList.toggle('hidden', !showBackButton);
    }

    const filter = document.querySelector<HTMLImageElement>('#filter-button');
    filter?.classList.toggle('filter-active', appState.activePage === 'feed');
    filter?.addEventListener('click', openFilter);
    filter?.removeEventListener('click', closeFilter);

    const chatButton = document.querySelector('#chats');
    chatButton?.addEventListener('click', openChatList);
    chatButton?.removeEventListener('click', closeChatList);
};
