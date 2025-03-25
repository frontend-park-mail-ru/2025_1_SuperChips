import { loadImages } from 'entities/Pin/lib/loadImages';
import { Pin } from 'entities/Pin';
import { IImage } from 'shared/types/Image';

/**
 * Загружает картинки и создает коллаж для страниы входа
 */
export const fillPictureBox = async (pageNum: number) => {
    const images = await loadImages(pageNum);
    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    if (!images || typeof images === 'number') return;

    images.data.forEach((item: IImage) => {
        newFrame.appendChild(Pin(item.image));
    });

    const pictureBox = document.querySelector('.picture-box') as HTMLDivElement;
    pictureBox.innerHTML = newFrame.innerHTML;
};
