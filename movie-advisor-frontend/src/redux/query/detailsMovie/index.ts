import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"





export const detailsMovieApi = createApi({
    reducerPath: 'detailsMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/movie` }),
    endpoints: (builder) => ({
        getDetailsMovie: builder.query<string, string>({
            query: (id) =>
                `${id}?api_key=${apiKey}&language=it-IT`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDetailsMovieQuery } = detailsMovieApi