import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';
import { ImageInput } from '../../../shared/components/imageInput';

export const NewPinPage = async () => {
    const page = document.createElement('div');

    const config = {
    };

    page.insertAdjacentHTML('beforeend', NewPinTemplate({}));

    const imageInput = await ImageInput();
    page.appendChild(imageInput);

    return page;
};
