import { loadImages } from 'entities/Pin/lib/loadImages';
import { Pin } from 'entities/Pin';

/**
 * Загружает картинки и создает коллаж для страниы входа
 * @returns {Promise<void>}
 */
export const fillPictureBox = async (pageNum) => {
    const images = await loadImages(pageNum);
    if (images === null || images === 404) return;

    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    images.data.forEach((item) => {
        newFrame.appendChild(Pin(item.image));
    });

    const pictureBox = document.querySelector('.picture-box');
    pictureBox.innerHTML = newFrame.innerHTML;
};
