export interface IResultMRec {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
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

export interface IMovieRecommendationsRootObject {
    page: number;
    results: IResultMRec[];
    total_pages: number;
    total_results: number;
}
export interface IResMovieRecommendations {
    data: IMovieRecommendationsRootObject;
    error: {} | undefined;
    isLoading: boolean;
    isSuccess: boolean;
}