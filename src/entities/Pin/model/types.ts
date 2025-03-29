import { IImage } from 'pages/FeedPage';

export interface ILoadedImages {
    status: number,
    data?: [
        IImage
    ];
}
