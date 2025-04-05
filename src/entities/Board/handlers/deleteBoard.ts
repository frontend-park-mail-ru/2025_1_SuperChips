import { BoardPopup } from 'widgets/BoardPopup';

export const deleteBoard = async (event: Event) => {
    const icon = event.target as HTMLImageElement;
    const name = icon.id.slice(7);


    // Когда будет готова ручка для удаления досок, сюда добавится логика


    BoardPopup('delete', name);
};
