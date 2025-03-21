import { User } from 'entities/User';
import { Auth } from 'features/authorization';
import { navigate } from 'shared/router';

export const logoutHandler = async (event) => {
    event.preventDefault();

    User.clearUserData();
    await Auth.logout();

    navigate('feed', true).finally();
};
