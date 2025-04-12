import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';

export const submitHandler = async () => {
    const imageInput = document.querySelector<HTMLInputElement>('.image-input__field');
    const titleInput = document.querySelector<HTMLInputElement>('#title');
    const aboutInput = document.querySelector<HTMLTextAreaElement>('#about');
    const privateInput = document.querySelector<HTMLInputElement>('#isPrivate');

    if (!imageInput || !titleInput || !aboutInput || !privateInput) return;
    if (!imageInput.files || imageInput.files.length === 0) return;

    const formData = new FormData();

    formData.append('image', imageInput.files[0]);

    if (titleInput.value !== '') {
        formData.append('title', titleInput.value);
    }

    if (aboutInput.value !== '') {
        formData.append('about', aboutInput.value);
    }

    formData.append('is_private', privateInput.checked.toString());

    const response = await API.post('/api/v1/flows', formData);

    if (response instanceof Response && response.ok) {
        imageInput.value = '';
        titleInput.value = '';
        aboutInput.value = '';

        const btn = document.querySelector<HTMLImageElement>('#clear-button');
        btn?.click();

        Toast('Flow был успешно создан', 'message', 5000);
    }
};
