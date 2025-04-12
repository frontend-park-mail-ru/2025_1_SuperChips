import { IPicture } from 'features/imageLoader';

export interface IBoardProps {
    id: string,
    name: string,
    is_private: boolean,
    flow_count: number | string,
    own: boolean,
    preview: IPicture[],
}
