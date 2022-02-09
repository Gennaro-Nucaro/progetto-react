import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"


export const similarMovieApi = createApi({
    reducerPath: 'similarMovieApiApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/movie` }),
    endpoints: (builder) => ({
        getSimilarMovieApi: builder.query<string, string>({
            query: (id) =>
                `${id}/similar?api_key=${apiKey}&language=it-IT`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSimilarMovieApiQuery } = similarMovieApi