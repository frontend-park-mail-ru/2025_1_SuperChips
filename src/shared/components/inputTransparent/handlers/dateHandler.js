export const dateHandler = (event) => {
    const value = event.target.value;
    const parts = value.split('-');

    if (parts.length < 3) return;

    parts[0] = parts[0].slice(0, 4);
    event.target.value = parts.join('-');
};
