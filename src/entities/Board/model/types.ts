import { IPicture } from 'features/imageLoader';

export interface IBoardProps {
    id: number,
    name: string,
    is_private: boolean,
    flow_count: number,
    own: boolean,
    preview: IPicture[],
    permanent?: boolean,
}
