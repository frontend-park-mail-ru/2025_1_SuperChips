export interface IBoardProps {
    own: boolean,
    is_private: boolean,
    id: string,
    name: string,
    flow_count: number | string,
    preview: string[],
}
