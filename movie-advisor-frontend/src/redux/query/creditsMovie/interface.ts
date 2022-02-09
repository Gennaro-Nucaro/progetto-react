export interface ICastCreditsMovie {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface ICrew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

interface ICreditMovieRootObject {
    id: number;
    cast: ICastCreditsMovie[];
    crew: ICrew[];
}

export interface IResCreditMovie {
    data: ICreditMovieRootObject;
    error: {} | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    status: string;
}