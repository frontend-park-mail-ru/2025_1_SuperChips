type DebouncedFunction<Args extends unknown[]> = (
    ..._args: Args
) => void;

export const debounce = <Args extends unknown[]>(
    func: (..._args: Args) => void,
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
