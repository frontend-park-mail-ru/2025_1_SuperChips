/**
 * Создает обработчик событий, который вызывает заполняющую функцию при скролле
 */
export const scrollHandler = async (filler: () => Promise<void | undefined | null>) => {
    const threshold = window.innerHeight * 2;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;
    if (scrolledToBottom) {
        await filler();
    }

    const scrollButton = document.querySelector('.scroll-to-top');

    if (window.scrollY > 1000) {
        scrollButton?.classList.remove('hidden');
    } else {
        scrollButton?.classList.add('hidden');
    }
};
