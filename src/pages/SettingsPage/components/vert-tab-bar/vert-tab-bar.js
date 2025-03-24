import './vert-tab-bar.scss';

/**
 * Создает вертикальную панель вкладок
 * @param {Array} tabs - массив вкладок
 * @param {string} tabs[].id - идентификатор вкладки
 * @param {string} tabs[].title - заголовок вкладки
 * @param {boolean} tabs[].active - активна ли вкладка
 * @param {Function} onTabClick - функция, вызываемая при клике на вкладку
 * @returns {HTMLElement}
 */
export const createVertTabBar = (tabs, onTabClick) => {
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

        tabElement.addEventListener('click', () => {
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