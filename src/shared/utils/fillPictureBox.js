import {loadImages} from '../../pages/feed/lib/loadImages';

export const fillPictureBox = async () => {
    const newFrame = await loadImages();
    const pictureBox = document.querySelector('.picture-box');
    pictureBox.innerHTML = newFrame.innerHTML;
};