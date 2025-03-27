export const formatDateToISO = (
    dateString: string | null
) => {
    if (!dateString) {
        return '';
    }

    const [year, month, day] = dateString.split('-');

    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return date.toISOString().replace(/\.\d+Z$/, 'Z');
};
