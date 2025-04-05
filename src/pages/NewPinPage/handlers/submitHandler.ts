import { API } from 'shared/api/api';

export const submitHandler = async () => {
    const imageInput = document.querySelector<HTMLInputElement>('.image-input__field');
    const titleInput = document.querySelector<HTMLInputElement>('#title');
    const aboutInput = document.querySelector<HTMLTextAreaElement>('#about');

    if (!imageInput || !titleInput || !aboutInput) return;
    if (!imageInput.files || imageInput.files.length === 0) return;

    const formData = new FormData();

    formData.append('image', imageInput.files[0]);

    if (titleInput.value !== '') {
        formData.append('title', titleInput.value);
    }

    if (aboutInput.value !== '') {
        formData.append('about', aboutInput.value);
    }

    await API.post('api/v1/pin/', formData);
};
