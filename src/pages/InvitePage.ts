import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';
import { navigate } from 'shared/router';
import './InvitePage.scss';

export const InvitePage = async (): Promise<HTMLDivElement | null> => {
    const container = document.createElement('div');
    container.className = 'invite-page';

    // Получаем ID приглашения из URL
    const path = window.location.pathname;
    console.log('Полный путь:', path); // Для отладки
    
    // Извлекаем ID приглашения из последней части пути
    const inviteId = path.split('/').pop();
    console.log('ID приглашения:', inviteId); // Для отладки
    
    if (!inviteId || inviteId === 'invite') {
        Toast('Неверная ссылка приглашения', 'error');
        navigate('/');
        return null;
    }

    // Создаем интерфейс загрузки
    container.innerHTML = `
        <div class="invite-page__content">
            <h1>Присоединение к доске</h1>
            <p>Пожалуйста, подождите...</p>
        </div>
    `;

    try {
        // Делаем POST запрос к API
        console.log('Отправляем запрос к API:', `/join/${inviteId}`); // Для отладки
        const response = await API.post(`/join/${inviteId}`);
        
        if (!(response instanceof Response)) {
            throw new Error('Ошибка при присоединении к доске');
        }

        const body = await response.json();
        console.log('Ответ от API:', body); // Для отладки

        if (response.ok) {
            Toast('Вы успешно присоединились к доске', 'success');
            // Перенаправляем на страницу доски
            if (body?.data?.board_id) {
                navigate(`/board/${body.data.board_id}`, true);
            } else {
                navigate('/boards');
            }
        } else if (response.status === 409) {
            Toast('Вы уже являетесь соавтором этой доски', 'message');
            navigate('/boards');
        } else if (response.status === 410) {
            Toast('Срок действия ссылки истек', 'error');
            navigate('/boards');
        } else {
            throw new Error(body.description || 'Ошибка при присоединении к доске');
        }
    } catch (error) {
        console.error('Ошибка:', error); // Для отладки
        Toast(error instanceof Error ? error.message : 'Ошибка при присоединении к доске', 'error');
        navigate('/boards');
    }

    return container;
}; 