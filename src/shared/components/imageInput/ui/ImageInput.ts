import ImageInputTemplate from './ImageInput.hbs';
import './ImageInput.scss';

export const ImageInput = async () => {
    const config = {};
    const container = document.createElement('div');
    container.innerHTML = ImageInputTemplate(config);

    return container;
};
