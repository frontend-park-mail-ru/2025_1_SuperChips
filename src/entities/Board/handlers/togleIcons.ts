export const toggleIcons = (id: string) => {
    const board = document.getElementById(id);

    const pen = board?.querySelector<HTMLImageElement>('.preview__icon-edit');
    const bin = board?.querySelector<HTMLImageElement>('.preview__icon-delete');

    pen?.classList.toggle('hidden');
    bin?.classList.toggle('hidden');
};
