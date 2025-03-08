export const formatDateToISO = (dateString) => {
    if (dateString === '') {
        return;
    }

    const [year, month, day] = dateString.split('-');

    const date = new Date(Date.UTC(year, month - 1, day));

    return date.toISOString().replace(/\.\d+Z$/, 'Z');
};