export interface IPicture {
    header: string,
    media_url: string,
    author_id: number,
    like_count: number,
}

export interface ILoadedPictures {
    status: number,
    data?: [
        IPicture
    ];
}
