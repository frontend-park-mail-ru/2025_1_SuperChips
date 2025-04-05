export const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    const imageContainer = document.querySelector<HTMLDivElement>('.image-input');
    imageContainer?.classList.add('image-input__dragover');
};

export const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    const imageContainer = document.querySelector<HTMLDivElement>('.image-input');
    imageContainer?.classList.remove('image-input__dragover');
};

export const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    const imageContainer = document.querySelector<HTMLDivElement>('.image-input');
    const input = document.querySelector<HTMLInputElement>('.image-input__field');

    imageContainer?.classList.remove('image-input__dragover');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input!.files = dataTransfer.files;

        input?.dispatchEvent(new Event('change'));
    }
};
