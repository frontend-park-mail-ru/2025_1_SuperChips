import { validateImage } from 'shared/validation';
import { ErrorToast } from 'shared/components/errorToast';

export const inputHandler = () => {
    const input = document.querySelector<HTMLInputElement>('.image-input__field');
    const preview = document.querySelector<HTMLImageElement>('#preview');
    const selectButton = document.querySelector<HTMLButtonElement>('#image-input-button');
    const clearButton = document.querySelector<HTMLImageElement>('#clear-button');

    if (!input?.files || input.files.length === 0) return;

    const file = input.files[0];
    const imageURL = URL.createObjectURL(file);

    if (preview) {
        preview.src = imageURL;
        preview.onload = () => URL.revokeObjectURL(imageURL);
        selectButton?.classList.add('display-none');
    }

    if (clearButton) {
        clearButton.classList.remove('display-none');
    }

    const valid = validateImage(file);
    
    if (!valid.isValid) {
        ErrorToast(valid.error);
    }
};
