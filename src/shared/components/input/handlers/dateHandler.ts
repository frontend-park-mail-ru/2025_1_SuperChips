export const dateHandler = (event: Event) => {
    const input = event.target as HTMLInputElement | null;

    if (!input) return;

    const value = input.value;
    const parts = value.split('-');

    if (parts.length < 3) return;

    parts[0] = parts[0].slice(0, 4);
    input.value = parts.join('-');
};
