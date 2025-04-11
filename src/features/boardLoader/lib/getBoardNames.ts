export const getBoardNames = (): string[] | null => {
    const data = sessionStorage.getItem('boardNames');
    return data ? JSON.parse(data) : null;
};
