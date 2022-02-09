


// get

export interface IFilmList {
    name: string;
    id: string;
    _id: string;
}

export interface IAttoriList {
    name: string;
    img: string;
    count: number;
    _id: string;
    id: string;
}

export interface IDirectorsList {
    name: string;
    img: string;
    count: number;
    _id: string;
    id: string;

}

export interface IGenereList {
    name: string;
    count: number;
    _id: string;
}

export interface IAnniList {
    name: string;
    count: number;
    _id: string;
}

export interface IRes {
    _id: string;
    idUser: string;
    filmList: IFilmList[];
    attoriList: IAttoriList[];
    directorsList: IDirectorsList[];
    genereList: IGenereList[];
    anniList: IAnniList[];
    __v: number;
}


export interface IResGetStats {
    success: boolean;
    msg: string;
    res: IRes;
}
// post 
export interface IItemStats {
    name: string,
    id?: string,
    count: number,
    img?: string
}

export interface IItemPayload {
    name: string,
    id: string,
    img?: string
}
export interface payloadAddItemStats {
    filmList: IItemPayload,
    genereList: IItemPayload[],
    anniList: IItemPayload[],
    attoriList: IItemPayload[],
    directorsList: IItemPayload[],
}


//store
export interface IStatsStore {
    filmList: IItemPayload[],
    genereList: IItemStats[],
    anniList: IItemStats[],
    attoriList: IItemStats[],
    directorsList: IItemStats[],
    //
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}

//put
export interface IResPut {
    success: boolean;
    msg: string;
}
