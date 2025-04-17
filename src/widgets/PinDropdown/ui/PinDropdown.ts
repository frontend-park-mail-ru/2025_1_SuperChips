import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { pinDropdownTabBarHandler } from '../handlers/pinDropdownTabBarHandler';
import { findPosition } from '../lib/findPosition';
import { closePopup, toggleScroll } from 'widgets/BoardPopup';
import { USER_OWN_PINS_BOARD, USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { appState } from 'shared/router';
import { root } from 'app/app';
import template from './PinDropdown.hbs';
import './PinDropdown.scss';
import { createPinDropdown } from '../handlers/createHandler';
import { BoardStorage } from 'features/boardLoader';


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

    const boardToSave = BoardStorage.boardToSave;
    const tabs: ITabItem[] = [
        { id: '0', title: 'Мои flow', active: boardToSave === USER_SAVED_PINS_BOARD }
    ];

    const boardList = BoardStorage.getBoardNames();
    boardList?.forEach((name, index) => {
        if (name !== USER_SAVED_PINS_BOARD && name !== USER_OWN_PINS_BOARD) {
            tabs.push({ id: (index + 1).toString(), title: name, active: name === boardToSave });
        }
    });

    const tabBar = container.querySelector('.tab-bar-placeholder');
    if (tabBar) {
        const newTabBar = TabBar(tabs, 'vertical', (tabId) => {
            pinDropdownTabBarHandler(tabId).finally();
        });
        tabBar?.replaceWith(newTabBar);
        newTabBar.style.gap = '0';
    }

    const closeButton = container.querySelector<HTMLImageElement>('.popup__close');
    closeButton?.addEventListener('click', closePopup);

    const createButton = container.querySelector<HTMLDivElement>('.dropdown__create-board');
    createButton?.addEventListener('click', createPinDropdown);

    setTimeout(() => {
        document.addEventListener('click', closePopup);
    }, 0);
    document.addEventListener('keydown', closePopup);

    root.appendChild(container.firstChild as HTMLDivElement);
};
