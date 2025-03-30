import { Auth } from 'features/authorization';
import { navigate } from 'shared/router';

export const logoutHandler = async (event: Event) => {
    event.preventDefault();

    await Auth.logout();

    navigate('feed', true).finally();
};
