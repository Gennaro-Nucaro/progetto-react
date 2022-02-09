

export interface IItemPreferiti {
    name: string,
    idFilm: string,
    img: string
}
export interface IItems {
    items: IItemPreferiti[]
}

export interface IResGetPreferiti {
    success: boolean,
    msg: string,
    res: IItems
}

export interface IPreferitiStore {
    preferiti: IItemPreferiti[],
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}