import { goToPage } from '../../../shared/router';
import { Auth } from '../../../features/authorization/auth';

export const handleSubmit = async (event) => {
    const inputData = {};
    const inputs = event.target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    const result = await Auth.login(inputData);

    switch (result.status) {
    case '200':
        goToPage('feed');
        break;
    case '403':
        alert('Неправильный пароль');
        break;
    case '404':
        alert('Такого пользователя не существует');
        break;
    default:
        alert(result);
    }
}
;