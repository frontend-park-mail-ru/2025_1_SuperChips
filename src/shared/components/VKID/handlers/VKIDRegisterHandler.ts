import { API } from 'shared/api';
import { navigate } from 'shared/router';
import { Toast } from 'shared/components/Toast';
import { validateUsername } from 'shared/validation';


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

    const register = await API.post('/api/v1/auth/external/register', body);
    console.log(register);
    if (register instanceof Response && register.ok) {
        // await Auth.fetchUserData();
        // await Navbar();
        // await Sidebar();
        navigate('feed').finally();
    } else {
        Toast('Ошибка при регистрации, попробуйте немного позже', 'error', 5000);
    }
};
