export const getBoardNames = (): string[] | null => {
    const data = localStorage.getItem('boardNames');
    return data ? JSON.parse(data) : null;
};
