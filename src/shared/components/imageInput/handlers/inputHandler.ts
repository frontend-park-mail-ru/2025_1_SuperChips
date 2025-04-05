import { validateImage } from 'shared/validation';
import { ErrorToast } from 'shared/components/errorToast';

export const inputHandler = () => {
    const input = document.querySelector<HTMLInputElement>('.image-input__field');
    const preview = document.querySelector<HTMLImageElement>('#preview');
    const selectButton = document.querySelector<HTMLButtonElement>('#image-input-button');
    const clearButton = document.querySelector<HTMLImageElement>('#clear-button');
    const hint = document.querySelector<HTMLInputElement>('.image-input__hint');


    if (!input?.files || input.files.length === 0) return;

    const file = input.files[0];
    const imageURL = URL.createObjectURL(file);

    if (preview) {
        preview.src = imageURL;
        preview.onload = () => URL.revokeObjectURL(imageURL);
        selectButton?.classList.add('display-none');
    }

    clearButton?.classList.remove('display-none');
    hint?.classList.add('display-none');

    const valid = validateImage(file);
    
    if (!valid.isValid) {
        ErrorToast(valid.error);
        input.value = '';
        selectButton?.classList.remove('display-none');
        clearButton?.classList.add('display-none');
    }
};
