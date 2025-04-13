export interface IPinProps {
    url: string,
    pinID: string,
    boardID?: string,
    saved?: boolean,
    onBoard?: boolean,
    canDelete?: boolean,
    canRemove?: boolean,
    authorized?: boolean,
}
