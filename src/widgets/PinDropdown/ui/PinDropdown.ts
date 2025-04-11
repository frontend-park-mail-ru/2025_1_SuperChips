import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { getBoardNames } from 'features/boardLoader';
import { handleTabBar } from '../handlers/handleTabBar';
import { BoardPopup, closePopup, toggleScroll } from 'widgets/BoardPopup';
import { appState } from 'shared/router';
import { root } from 'app/app';
import template from './PinDropdown.hbs';
import './PinDropdown.scss';


const dropdownWidth = 360;
const dropdownHeight = 300;


export const PinDropdown = (pinID: string) => {
    if (appState.isShowingPopup) return;
    appState.isShowingPopup = true;
    toggleScroll('disabled');

    const container = document.createElement('div');
    container.innerHTML = template({});

    const position = findPosition(pinID);
    const dropdown = container.querySelector<HTMLDivElement>('.dropdown');
    if (dropdown) {
        dropdown.style.left = `${position.x}px`;
        dropdown.style.top = `${position.y}px`;
    }

    const tabs: ITabItem[] = [
        { id: '0', title: 'Мои flow', active: true }
    ];

    const boardList = getBoardNames();
    boardList?.forEach((name, index) => {
        tabs.push({ id: (index + 1).toString(), title: name, active: false });
    });

    const newTabBar = TabBar(tabs, 'vertical', (tabId) => {
        handleTabBar(tabId, pinID).finally();
    });

    const tabBar = container.querySelector('.tab-bar-placeholder');
    if (tabBar) {
        tabBar?.replaceWith(newTabBar);
        newTabBar.style.gap = '0';
    }

    const closeButton = container.querySelector<HTMLImageElement>('.popup__close');
    closeButton?.addEventListener('click', closePopup);

    document.addEventListener('keydown', closePopup);
    setTimeout(() => {
        document.addEventListener('click', closePopup);
    }, 0);

    const createButton = container.querySelector<HTMLDivElement>('.dropdown__create-board');
    createButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        BoardPopup('create');
        dropdown?.remove();
    });

    root.appendChild(container.firstChild as HTMLDivElement);
};


const findPosition = (pinID: string) => {
    const pin = document.querySelector(`#pin-${pinID}`);
    const rect = pin?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    let x = rect.left - 80;
    let y = rect.top + 60;

    if (y + 60 + dropdownHeight > window.innerHeight) {
        y = y - dropdownHeight - 60;
    }

    if (x + dropdownWidth > window.innerWidth) {
        x = window.innerWidth - (dropdownWidth) - 40;
    }

    return { x: x, y: y };
};
