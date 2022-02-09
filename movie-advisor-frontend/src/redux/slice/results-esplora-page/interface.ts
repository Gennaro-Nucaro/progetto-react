export interface IItemWatchList {
    name: string,
    idFilm: string
}
export interface IItems {
    items: IItemWatchList[]
}

export interface IResGetWatchlist {
    success: boolean,
    msg: string,
    res: IItems
}

export interface IResultStore {
    result: any[],
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}