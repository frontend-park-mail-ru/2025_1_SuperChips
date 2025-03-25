/**
 * Создает элемент скелетона для ленты
 * @returns {HTMLElement}
 */
export const createSkeleton = () => {
    const skeleton = document.createElement('div');
    const randomHeight = Math.floor(Math.random() * 3) + 1;

    skeleton.className = `feedSkeleton skeleton-${randomHeight}`;
    return skeleton;
}; 
