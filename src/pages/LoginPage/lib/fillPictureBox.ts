import { loadFeedPictures } from 'features/imageLoader';
import { Pin } from 'entities/Pin';
import type { IPicture } from 'features/imageLoader';

/**
 * Загружает картинки и создает коллаж для страниы входа
 */
export const fillPictureBox = async (pageNum: number) => {
    const pictureBox = document.querySelector<HTMLDivElement>('.picture-box');
    if (!pictureBox) return;

    const images = await loadFeedPictures(pageNum);
    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    if (!images?.data) { // Ошибка уже обрабатывается в loadFeedPictures
        return;
    }

    images.data.forEach((item: IPicture) => {
        newFrame.appendChild(Pin(item.media_url));
    });

    pictureBox.innerHTML = newFrame.innerHTML;
};
