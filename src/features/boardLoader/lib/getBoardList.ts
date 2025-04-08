export const getBoardList = () => {
    const data = localStorage.getItem('boardList');
    return data ? JSON.parse(data) : null;
};
