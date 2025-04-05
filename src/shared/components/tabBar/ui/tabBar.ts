import './tabBar.scss';

/**
 * Interface for tab item properties
 */
export interface ITabItem {
    id: string;
    title: string;
    active: boolean;
}

type TTabBarDirection = 'horizontal' | 'vertical';


/**
 * Создает панель вкладок
 * @param {ITabItem[]} tabs - массив вкладок
 * @param direction - направление панели вкладок - вертикальное или горизонтальное
 * @param {Function} onTabClick - функция, вызываемая при клике на вкладку
 * @returns {HTMLElement}
 */
export const TabBar = (tabs: ITabItem[], direction: TTabBarDirection, onTabClick: (tabId: string) => void): HTMLElement => {
    const tabBar = document.createElement('div');
    tabBar.classList.add('tab-bar');

    if (direction === 'vertical') {
        tabBar.classList.add('vertical');
    }

    tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.classList.add('tab-bar__tab');
        if (tab.active) {
            tabElement.classList.add('tab-bar__tab_active');
        }
        tabElement.setAttribute('id', tab.id);
        tabElement.textContent = tab.title;

        tabElement.addEventListener('click', () => {
            const activeTabs = tabBar.querySelectorAll('.tab-bar__tab_active');
            activeTabs.forEach(activeTab => {
                activeTab.classList.remove('tab-bar__tab_active');
            });
            tabElement.classList.add('tab-bar__tab_active');
            onTabClick(tab.id);
        });

        tabBar.appendChild(tabElement);
    });

    return tabBar;
};
