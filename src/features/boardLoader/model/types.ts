export interface IBoard {
    authorId: number,
    name: string,
    isPrivate: boolean,
}

export interface IBoardList {
    status: number,
    data: IBoard[]
}
