import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { User } from 'entities/User';

interface IInputData {
    email: string,
    password: string,
}

export const handleLogin = async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const inputData: IInputData = {
        email: '',
        password: '',
    };

    const inputs: NodeListOf<HTMLInputElement> = target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        const key = input.id as keyof IInputData;

        inputData[key] = input.value;
    });

    const response = await Auth.login(inputData);
    if (response instanceof Error) return;

    if (response.ok) {
        await User.fetchUserData();
        navigate('feed').finally();
    }
    else {
        const icon = document.querySelector('#password-error-icon');
        const message = document.querySelector('#password-error');
        const eye = document.querySelector('#password-eye') as HTMLImageElement;
        if (!icon || !message || !eye) return;

        message.textContent = 'Неправильный пароль или почта';
        message.classList.remove('hidden');
        icon.classList.remove('hidden');
        eye.style.right = '36px';
    }
};
