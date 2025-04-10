export const clearButtonHandler = () => {
    const input = document.querySelector<HTMLInputElement>('.image-input__field');
    const preview = document.querySelector<HTMLImageElement>('#preview');
    const selectButton = document.querySelector<HTMLButtonElement>('#image-input-button');
    const clearButton = document.querySelector<HTMLImageElement>('#clear-button');

    const hint = document.querySelector<HTMLInputElement>('.image-input__hint');


    if (input) {
        input.files = null;
    }
    if (preview) {
        preview.src = '';
    }

    clearButton?.classList.add('display-none');
    selectButton?.classList.remove('display-none');

    hint?.classList.remove('display-none');


    if (input) {
        input.value = '';
    }
};
