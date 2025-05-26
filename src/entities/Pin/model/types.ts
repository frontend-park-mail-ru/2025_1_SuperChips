export interface IPinProps {
    url: string,
    pinID: string,
    width: number,
    height: number,
    boardID?: string,
    saved?: boolean,
    canDelete?: boolean,
    canRemove?: boolean,
    authorized?: boolean,
    canEdit?: boolean,
    is_nsfw?: boolean,
}
