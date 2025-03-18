import { User } from 'entities/User';
import { Auth } from 'features/authorization/api/auth';

export const logoutHandler = async (event) => {
    event.preventDefault();
    User.logout();
    await Auth.logout();
    window.scrollTo({
        top: 0,
    });
};
