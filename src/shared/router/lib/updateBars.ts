import type { Route } from 'shared/config/router';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';


export const updateBars = (route: Route) => {
    const navbar = document.querySelector<HTMLDivElement>('.navbar');
    const showNavbar = !route.noNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = !route.noSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = !route.noBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);

    if (appState.activePage !== 'feed') {
        document.querySelector('#filter-button')?.classList.add('not-allowed');
    } else {
        document.querySelector('#filter-button')?.classList.remove('not-allowed');
    }
};
