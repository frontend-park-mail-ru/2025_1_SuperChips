type ThrottledFunction<Args extends unknown[]> = (
    ..._args: Args
) => void;

export const throttle = <Args extends unknown[]>(
    func: (..._args: Args) => void,
    delay: number
): ThrottledFunction<Args> => {
    let lastCall = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Args) => {
        const now = Date.now();

        if (delay <= now - lastCall) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastCall = now;
            func(...args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastCall = Date.now();
                timeout = null;
                func(...args);
            }, now - lastCall);
        }
    };
};
