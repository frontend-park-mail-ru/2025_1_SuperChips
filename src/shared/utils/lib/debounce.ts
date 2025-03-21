type DebouncedFunction<T extends (...args: unknown[]) => unknown> = (
    ...args: Parameters<T>
) => void;

export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
): DebouncedFunction<T> => {
    let timer: ReturnType<typeof setTimeout>;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
