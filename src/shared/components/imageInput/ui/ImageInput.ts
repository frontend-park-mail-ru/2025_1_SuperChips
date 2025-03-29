import ImageInputTemplate from './ImageInput.hbs';
import './ImageInput.scss';

export const ImageInput = () => {

    const container = document.createElement('div');
    container.innerHTML = ImageInputTemplate({});

    return container.firstElementChild as HTMLDivElement;
};
