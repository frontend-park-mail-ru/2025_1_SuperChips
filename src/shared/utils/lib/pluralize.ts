export const pluralize = (word: string, count: number) => {
    if (word.toLowerCase() === 'пин' || word.toLowerCase() === 'подписчик') {
        if (11 <= count % 100 && count % 100 <= 19) {
            return count.toString() + ' ' + word + 'ов';
        } else if (count % 10 === 1) {
            return count.toString() + ' ' + word;
        } else if (2 <= count % 10 && count % 10 <= 4) {
            return count.toString() + ' ' + word + 'а';
        } else {
            return count.toString() + ' ' + word + 'ов';
        }
    } else {
        return count.toString() + ' ' + word;
    }
};
