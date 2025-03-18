import { User } from 'entities/User';
import { Auth } from 'features/authorization';
import { goToPage } from 'shared/router/router';

export const logoutHandler = async (event) => {
    event.preventDefault();

    User.logout();
    await Auth.logout();

    window.scrollTo({
        top: 0,
    });

    await goToPage('/feed', false);
};
