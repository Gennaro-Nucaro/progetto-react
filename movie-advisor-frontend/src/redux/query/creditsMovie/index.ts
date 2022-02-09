import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"





export const creditsMovieApi = createApi({
    reducerPath: 'creditsMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/movie` }),
    endpoints: (builder) => ({
        getCreditsMovie: builder.query<string, string>({
            query: (id) =>
                `${id}/credits?api_key=${apiKey}&language=it-IT`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCreditsMovieQuery } = creditsMovieApi