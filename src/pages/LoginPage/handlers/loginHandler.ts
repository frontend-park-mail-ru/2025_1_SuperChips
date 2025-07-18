import { Auth } from 'features/authorization';
import { validateEmail, validatePassword } from 'shared/validation';

interface ILoginInputData {
    email: string,
    password: string,
}

export const handleLogin = async (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const inputData: ILoginInputData = {
        email: '',
        password: '',
    };

    const inputs: NodeListOf<HTMLInputElement> = target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        const key = input.id as keyof ILoginInputData;
        inputData[key] = input.value.trim();
    });

    const valid = validateEmail(inputData.email).isValid && validatePassword(inputData.password).isValid;
    if (!valid) return;

    const response = await Auth.login(inputData);
    if (response instanceof Error) return;

    if (response.ok) {
        history.back();
    }
    else {
        const icon = document.querySelector('#password-error-icon');
        const message = document.querySelector('#password-error');
        const eye = document.querySelector<HTMLImageElement>('#password-eye');
        if (!icon || !message || !eye) return;

        message.textContent = 'Неправильный пароль или почта';
        message.classList.remove('hidden');
        icon.classList.remove('hidden');
        eye.style.right = '36px';
    }
};
