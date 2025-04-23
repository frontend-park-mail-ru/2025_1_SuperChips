// import { API } from 'shared/api';
// import { navigate } from 'shared/router';
// import { Toast } from 'shared/components/Toast';
import { validateUsername } from 'shared/validation';
import { Auth } from 'features/authorization';
// import { Navbar } from 'widgets/navbar';


export const VKIDRegisterHandler = async (accessToken: string) => {
    const input = document.querySelector<HTMLInputElement>('#username');
    if (!input) return;
    const username = input.value;

    const valid = validateUsername(username).isValid && username !== '';
    if (!valid) return;

    const body = {
        access_token: accessToken,
        username: username,
    };

    await Auth.VKIDRegister(body);

    // const register = await API.post('/api/v1/auth/vkid/register', body);
    // if (register instanceof Response && register.ok) {
    //     const body = await register.json();
    //
    //     await Auth.fetchUserData();
    //     await Navbar();
    //     navigate('feed').finally();
    // } else {
    //     Toast('Ошибка при регистрации, попробуйте немного позже', 'error', 5000);
    // }
};
