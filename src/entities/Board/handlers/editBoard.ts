import { BoardPopup } from 'widgets/BoardPopup';

export const editBoard = async (event: Event) => {
    const icon = event.target as HTMLImageElement;
    const name = icon.id.slice(5);

    // Когда будет готова ручка для изменения досок, сюда добавится логика


    BoardPopup('edit', name);
};
