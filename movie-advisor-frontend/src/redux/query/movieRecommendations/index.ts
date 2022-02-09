import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"




export const movieRecommendationsApi = createApi({
    reducerPath: 'movieRecommendationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/movie` }),
    endpoints: (builder) => ({
        getMovieRecommendations: builder.query<string, string>({
            query: (id) =>
                `${id}/recommendations?api_key=${apiKey}&language=it-IT`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieRecommendationsQuery } = movieRecommendationsApi