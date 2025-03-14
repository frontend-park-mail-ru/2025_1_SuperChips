import { loadImages } from '../../../shared/utils/loadImages';
import { FeedCard } from '../../../entities/FeedCard';

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
        newFrame.appendChild(FeedCard(item.image));
    });

    const pictureBox = document.querySelector('.picture-box');
    pictureBox.innerHTML = newFrame.innerHTML;
};
