import { User } from 'entities/User';
import { Auth } from 'features/authorization';
import { goToPage } from 'shared/router';

export const logoutHandler = async (event) => {
    event.preventDefault();

    User.clearUserData();
    await Auth.logout();

    await goToPage('/feed');
};
