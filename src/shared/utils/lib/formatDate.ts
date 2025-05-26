export const formatDateToISO = (dateString: string | null) => {
    if (!dateString) {
        return '';
    }

    const [year, month, day] = dateString.split('-');

    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

    return date.toISOString().replace(/\.\d+Z$/, 'Z');
};


export const formatDateToReadable = (dateInput: string | null | Date, short: boolean = false) => {
    if (!dateInput) return '';

    // Create a valid date object, ensuring it's not an invalid date
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }
    
    const now = new Date();

    const time = formatTime(date);
    
    if (isSameDay(date, now)) {
        return short ? time : `сегодня в ${time}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isSameDay(date, yesterday)) {
        return short ? 'вчера' : `вчера в ${time}`;
    }

    if (date.getFullYear() === now.getFullYear()) {
        return short ? formatDayShortMonth(date) : `${formatDayShortMonth(date)} в ${time}`;
    }

    return short ? formatFullDate(date) : `${formatFullDate(date)} в ${time}`;
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
