
export interface IResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ISimilaRMovieRootObject {
    page: number;
    results: IResult[];
    total_pages: number;
    total_results: number;
}
export interface IResSimilarMovie {
    data: ISimilaRMovieRootObject;
    error: {} | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}