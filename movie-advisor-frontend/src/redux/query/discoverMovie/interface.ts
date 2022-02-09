export interface IMovieRootObject {
    page: number;
    results: IMovieResult[];
    total_pages: number;
    total_results: number;
}
export interface IMovieResult {
    adult?: boolean;
    backdrop_path: string;
    genre_ids?: number[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path: string;
    release_date: string;
    title: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}



export interface IResDiscoverMovie {
    data: IMovieRootObject;
    error: {} | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    status: string;
    isFetching:boolean;
}