import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"


// const discoverMovie =
//     `https://api.themoviedb.org/3/discover/
//     movie?api_key=${apiKey}&language=it-IT&region=IT&sort_by=popularity.desc
//     &include_adult=false&include_video
//     =false&page=1&with_watch_monetization_types=flatrate`


interface IFiltro {
    sortBy?: string,
    releaseDateGTE?: string | number,
    releaseDateLTE?: string | number,
    with_genres?: string,
    provider?: string,
    page?: number
}
const numeroDivotiGTE = 50;


export const discoverMovieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/discover` }),
    endpoints: (builder) => ({
        getMovies: builder.query<object, IFiltro>({
            query: ({ sortBy = 'popularity.desc', releaseDateGTE, releaseDateLTE, with_genres = "", provider, page = 1 }) =>
                `movie?api_key=${apiKey}&language=it-IT&region=IT&sort_by=${sortBy}&page=${page}&release_date.gte=${releaseDateGTE}-12-31&release_date.lte=${releaseDateLTE}-12-31&vote_count.gte=${numeroDivotiGTE}&with_genres=${with_genres}&with_watch_providers=${provider}&watch_region=IT&with_watch_monetization_types=flatrate`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = discoverMovieApi