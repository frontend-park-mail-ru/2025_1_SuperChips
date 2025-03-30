import ImageInputTemplate from './ImageInput.hbs';
import './ImageInput.scss';
import { inputHandler } from '../handlers/inputHandler';
import { clearButtonHandler } from '../handlers/clearButtonHandler';
import { handleDragLeave, handleDragOver, handleDrop } from '../handlers/DnDHandler';

export const ImageInput = () => {
    const container = document.createElement('div');
    container.innerHTML = ImageInputTemplate({});

    const input = container.querySelector<HTMLInputElement>('.image-input__field');
    const selectButton = container.querySelector<HTMLButtonElement>('#image-input-button');
    const clearButton = container.querySelector<HTMLImageElement>('#clear-button');
    const imageContainer = container.querySelector<HTMLDivElement>('.image-input');


    input?.addEventListener('change', inputHandler);

    selectButton?.addEventListener('click', () => {
        input?.click();
    });

    clearButton?.addEventListener('click', clearButtonHandler);

    imageContainer?.addEventListener('dragover', handleDragOver);
    imageContainer?.addEventListener('dragleave', handleDragLeave);
    imageContainer?.addEventListener('drop', handleDrop);

    return container.firstElementChild as HTMLDivElement;
};
