import type { Route } from 'shared/config/router';
import { Auth } from 'features/authorization';

const scrollbar = {
    width: 0,       // для вертикального
    height: 0,      // для горизонтального
};

export const updateBars = (route: Route) => {
    const navbar = document.querySelector<HTMLDivElement>('.navbar');
    const sidebar = document.querySelector<HTMLDivElement>('.sidebar');

    const showNavbar = !route.noNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar.width === 0) {
        scrollbar.width = scrollbarWidth;
    }

    const scrollbarHeight = window.innerHeight - document.documentElement.clientHeight;
    if (scrollbar.height === 0) {
        scrollbar.height = scrollbarHeight;
    }

    const navbarPadding = scrollbarWidth > 0 ? '0' : `${scrollbar.width}px`;
    if (navbar) {
        navbar.style.paddingRight = navbarPadding;
    }

    const sidebarPadding = scrollbarHeight > 0 ? '0' : `${scrollbar.height}px`;
    if (sidebar) {
        sidebar.style.paddingBottom = sidebarPadding;
    }

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = !route.noSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = !route.noBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);
};
