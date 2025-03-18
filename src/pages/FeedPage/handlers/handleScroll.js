import { debounce } from 'shared/utils/debounce';
import { fillFeed } from '../lib/fillFeed';


/**
 * Загружает новые картинки для ленты, когда пользователь достигает определенной высоты
 * или создает футер с сообщением, когда картинки закончились
 * @returns {Promise<void>}
 */
const scrollHandler = async () => {
    const threshold = 700;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;
    if (scrolledToBottom) {
        await fillFeed();
    }
};

export const debouncedScroll = debounce(scrollHandler, 75);
