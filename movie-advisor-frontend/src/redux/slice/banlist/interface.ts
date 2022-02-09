export interface IItemBanList {
    name: string,
    idFilm: string
}
export interface IItems {
    items: IItemBanList[]
}

export interface IResGetWatchlist {
    success: boolean,
    msg: string,
    res: IItems
}

export interface IBanlistStore {
    banlist: IItemBanList[],
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}