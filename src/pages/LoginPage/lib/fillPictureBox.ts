import { loadImages } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import { IImage } from 'pages/FeedPage';
import { ErrorToast } from 'shared/components/errorToast';

/**
 * Загружает картинки и создает коллаж для страниы входа
 */
export const fillPictureBox = async (pageNum: number) => {
    const pictureBox = document.querySelector<HTMLDivElement>('.picture-box');
    if (!pictureBox) return;

    const images = await loadImages(pageNum);
    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    if (!images || images.status !== 200 || !images.data) { // Ошибка уже обрабатывается в loadImages
        return;
    }

    images.data.forEach((item: IImage) => {
        newFrame.appendChild(Pin(item.image));
    });

    pictureBox.innerHTML = newFrame.innerHTML;
};
