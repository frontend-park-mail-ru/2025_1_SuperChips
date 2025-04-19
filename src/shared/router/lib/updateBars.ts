import type { Route } from 'shared/config/router';
import { Auth } from 'features/authorization';

export const updateBars = (route: Route) => {
    const navbar = document.querySelector<HTMLDivElement>('.navbar');
    const showNavbar = !route.noNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0 && navbar) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
    } else if (scrollbarWidth <= 0 && navbar) {
        navbar.style.paddingRight = '0';
    }

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = !route.noSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = !route.noBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);
};
