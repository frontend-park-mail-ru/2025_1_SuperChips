type DebouncedFunction<Args extends unknown[]> = (
    ...args: Args
) => void;

export const debounce = <Args extends unknown[]>(
    func: (...args: Args) => void,
    delay: number
): DebouncedFunction<Args> => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return (...args: Args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
