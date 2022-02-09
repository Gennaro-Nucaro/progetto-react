export interface ICast {
    release_date: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    vote_count: number;
    original_language: string;
    original_title: string;
    poster_path: string;
    title: string;
    video: boolean;
    vote_average: number;
    id: number;
    overview: string;
    popularity: number;
    character: string;
    credit_id: string;
    order: number;
    media_type: string;
    first_air_date: string;
    name: string;
    origin_country: string[];
    original_name: string;
    episode_count?: number;
}

export interface ICrew {
    genre_ids: number[];
    original_language: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: number;
    id: number;
    overview: string;
    release_date: string;
    vote_count: number;
    title: string;
    adult: boolean;
    backdrop_path: string;
    popularity: number;
    credit_id: string;
    department: string;
    job: string;
    media_type: string;
    original_name: string;
    origin_country: string[];
    first_air_date: string;
    name: string;
    episode_count?: number;
}

export interface ICreditsPeopleRootObject {
    cast: ICast[];
    crew: ICrew[];
    id: number;
}
export interface IResCreditsPeople {
    data: ICreditsPeopleRootObject;
    error: {} | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    status : string;

}