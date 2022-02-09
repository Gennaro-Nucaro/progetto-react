export interface IItemWatchList {
    name: string,
    idFilm: string,
    img: string
}
export interface IItems {
    items: IItemWatchList[]
}

export interface IResGetWatchlist {
    success: boolean,
    msg: string,
    res: IItems
}

export interface IWatchListStore {
    watchlist: IItemWatchList[],
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}