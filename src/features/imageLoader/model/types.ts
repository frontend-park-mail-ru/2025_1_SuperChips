export interface IPicture {
    image: string,
}

export interface ILoadedPictures {
    status: number,
    data?: [
        IPicture
    ];
}
