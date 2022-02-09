import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"


export const searchMovieApi = createApi({
    reducerPath: 'searchMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/search/movie` }),
    endpoints: (builder) => ({
        searchMovie: builder.query<string, string>({
            query: (_query) =>
                `?api_key=${apiKey}&language=it-It&query=${_query}&page=1&include_adult=false`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchMovieQuery } = searchMovieApi