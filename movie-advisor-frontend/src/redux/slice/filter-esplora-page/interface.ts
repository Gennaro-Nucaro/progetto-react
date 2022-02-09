//GENERE I
export interface IGenre {
    genres: [],
}

export interface IGetGeneri {
    data: IGenre
}

export interface IGenere {
    id: number;
    name: string;
    clicked: boolean;
}
//PROVIDER I
export interface IProvider {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
    clicked?: boolean;
}
export interface IResults {
    results: []
}

export interface IGetProvider {
    data: IResults
}

//SETTING I
export interface ISetting {
    sortBy: string;
    releaseDateGTE: string | number;
    releaseDateLTE: string | number;
}

// FILTER QUERY

export interface IfilterQuery {
    sortBy: string;
    provider: string;
    releaseDateLTE: string | number;
    releaseDateGTE: string | number;
    with_genres: string;


}

// ERROR I

export interface IError {
    error: boolean;
    msg: string | undefined;
}

//STORE I
export interface IStateFilter {
    generi: IGenere[];
    provider: IProvider[];
    filterCategory: string;
    setting: ISetting;
    errorState: IError;
    filterForQuery: IfilterQuery;
}
