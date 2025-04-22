export const parseQuery = (query: string)=> {
    try {
        const urlObj = new URL(query);
        const params = new URLSearchParams(urlObj.search);

        return Object.fromEntries(params.entries());
    }
    catch {
        return null;
    }
};
