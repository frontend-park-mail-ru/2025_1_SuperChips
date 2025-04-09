export const toggleIcons = (id: string) => {
    const board = document.getElementById(`board-${id}`);

    const pen = board?.querySelector<HTMLImageElement>('.preview__icon-edit');
    const bin = board?.querySelector<HTMLImageElement>('.preview__icon-delete');
    const lock = board?.querySelector<HTMLImageElement>('.private-icon');

    pen?.classList.toggle('hidden');
    bin?.classList.toggle('hidden');
    lock?.classList.toggle('hidden');
};
