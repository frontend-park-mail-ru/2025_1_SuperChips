export const formatDateToISO = (dateString: string | null) => {
    if (!dateString) {
        return '';
    }

    const [year, month, day] = dateString.split('-');

    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return date.toISOString().replace(/\.\d+Z$/, 'Z');
};


export const formatDateToReadable = (dateInput: string | null | Date) => {
    if (!dateInput) return '';

    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const now = new Date();

    if (isSameDay(date, now)) {
        return formatTime(date);
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(date, yesterday)) {
        return 'вчера';
    }

    if (date.getFullYear() === now.getFullYear()) {
        return formatDayShortMonth(date);
    }

    return formatFullDate(date);
};


const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
};

const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const formatDayShortMonth = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
};

const formatFullDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
};
