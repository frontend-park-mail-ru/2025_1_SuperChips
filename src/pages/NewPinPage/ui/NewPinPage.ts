import NewPinTemplate from './NewPinPage.hbs';
import './NewPinPage.scss';
import { ImageInput } from 'shared/components/imageInput';
import { Input } from '../../../shared/components/input';
import { handleLogin } from '../../LoginPage/handlers/loginHandler';
import { debouncedLoginButton } from '../../LoginPage/handlers/loginButtonHandler';

export const NewPinPage = async () => {
    const page = document.createElement('div');

    const config = {
        header: 'Новый flow',
        inputs: [
            {
                type: 'text',
                id: 'title',
                inputLabel: 'Название',
                errorMessage: '',
                maxlength: 128,
            },
            {
                type: 'text',
                id: 'description',
                inputLabel: 'Описание',
                errorMessage: '',
                maxlength: 512,
            },
            // {        пока что без тэгов???
            //     type: 'text',
            //     id: 'tags',
            //     inputLabel: 'Тэги',
            //     errorMessage: '',
            //     maxlength: 128,
            // }
        ]
    };

    page.innerHTML = NewPinTemplate(config);

    const imageInput = ImageInput();
    const newPinForm = page.querySelector('.new-pin-form');

    const form = page.querySelector('.new-pin-form');
    if (form) {
        const placeholders = form.querySelectorAll('.input-placeholder');
        placeholders.forEach((item, index) => {
            const newInput = Input(config.inputs[index]);
            if (newInput)
                item.replaceWith(newInput);
        });

        form.addEventListener('submit', handleLogin);
        form.addEventListener('input', debouncedLoginButton);
    }

    newPinForm?.insertAdjacentElement('afterbegin', imageInput);
    return page;
};


