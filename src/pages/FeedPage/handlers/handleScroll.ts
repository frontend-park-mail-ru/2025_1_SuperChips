import { debounce } from 'shared/utils';
import { fillFeed } from '../lib/fillFeed';


/**
 * Загружает новые картинки для ленты, когда пользователь достигает определенной высоты
 * или создает футер с сообщением, когда картинки закончились
 */
const scrollHandler = async () => {
    const threshold = 700;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;
    if (scrolledToBottom) {
        await fillFeed();
    }

    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 1000) {
        scrollButton?.classList.remove('hidden');
    } else {
        scrollButton?.classList.add('hidden');
    }
};

export const debouncedScroll = debounce(scrollHandler, 75);
