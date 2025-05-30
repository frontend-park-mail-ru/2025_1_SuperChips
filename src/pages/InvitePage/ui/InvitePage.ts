import { BoardStorage } from 'features/boardLoader';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';
import { navigate } from 'shared/router';
import './InvitePage.scss';


export const InvitePage = async () => {
    const path = window.location.pathname;
    const inviteId = path.split('/').pop();

    if (!Auth.userData) {
        Toast('Авторизуйтесь, чтобы присоединиться к соавторам', 'message', 5000);
        sessionStorage.setItem('redirectAfterAuth', path.slice(1));
        navigate('login').finally();
        return null;
    }


    if (!inviteId || inviteId === 'invite') {
        Toast('Неверная ссылка приглашения', 'error');
        navigate('feed').finally();
        return null;
    }

    // todo -- добавляется только после выполнения всех запросов, из-за чего не имеет смысла
    // Создаем интерфейс загрузки
    const container = document.createElement('div');
    // container.innerHTML = `
    //     <div class="invite-page__content">
    //         <h1>Присоединение к доске</h1>
    //         <p>Пожалуйста, подождите...</p>
    //     </div>
    // `;

    const response = await API.post(`/join/${inviteId}`);

    if (!(response instanceof Response)) {
        Toast('Ошибка при присоединении к доске');
        navigate('feed').finally();
        return null;
    }

    let redirect = false;

    if (response.ok) {
        Toast('Вы успешно присоединились к доске', 'success');
        redirect = true;
    } else if (response.status === 409) {
        Toast('Вы уже являетесь соавтором этой доски', 'message');
        redirect = true;
    } else if (response.status === 410) {
        Toast('Срок действия ссылки истек', 'error');
        navigate('feed').finally();
    } else {
        Toast('Ошибка при присоединении к доске. Попробуйте позже');
        navigate('feed').finally();
    }

    if (redirect) {
        BoardStorage.fetchUserBoards().finally();
        const body = await response.json();
        if (body?.data?.board_id) {
            navigate(`board/${body.data.board_id}`, true).finally();
            return; 
        }
        navigate(`${Auth.userData.username}/boards`).finally();
    }

    return container;
}; 
