import './vert-tab-bar.scss';

/**
 * Interface for tab item properties
 */
export interface ITabItem {
    id: string;
    title: string;
    active: boolean;
}

/**
 * Создает вертикальную панель вкладок
 * @param {ITabItem[]} tabs - массив вкладок
 * @param {Function} onTabClick - функция, вызываемая при клике на вкладку
 * @returns {HTMLElement}
 */
export const createVertTabBar = (tabs: ITabItem[], onTabClick: (tabId: string) => void): HTMLElement => {
    const tabBar = document.createElement('div');
    tabBar.classList.add('vert-tab-bar');

    tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.classList.add('vert-tab-bar__tab');
        if (tab.active) {
            tabElement.classList.add('vert-tab-bar__tab_active');
        }
        tabElement.setAttribute('id', tab.id);
        tabElement.textContent = tab.title;

        tabElement.addEventListener('click', (_event: MouseEvent): void => {
            const activeTabs = tabBar.querySelectorAll('.vert-tab-bar__tab_active');
            activeTabs.forEach(activeTab => {
                activeTab.classList.remove('vert-tab-bar__tab_active');
            });
            tabElement.classList.add('vert-tab-bar__tab_active');
            onTabClick(tab.id);
        });

        tabBar.appendChild(tabElement);
    });

    return tabBar;
};
