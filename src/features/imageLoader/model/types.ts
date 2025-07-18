export interface IPicture {
    flow_id: string,
    header: string,
    media_url: string,
    author_id: number,
    is_private: boolean,
    like_count: number,
    width: number,
    height: number,
    is_nsfw?: boolean,
}

export interface ILoadedPictures {
    status: number,
    data?: [
        IPicture
    ];
}
