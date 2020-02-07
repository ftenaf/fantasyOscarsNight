export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}
export interface Genre {
    id: number;
    name: string;
}
export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
}
export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}

export interface Credits {
    cast: Cast[];
    crew: Crew[];
}
export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MovieDetailsResponse {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: any;
    budget: number;
    credits: Credits;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: any;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    genre_list: Array<Genre>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieApiResult {
    page: number;
    results: Array<Movie>;
    total_pages: number;
    total_results: number;
    }
