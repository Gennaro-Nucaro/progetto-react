import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"




export const detailsPeopleApi = createApi({
    reducerPath: 'detailsPeopleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/person` }),
    endpoints: (builder) => ({
        getDetailsPeople: builder.query<string, string>({
            query: (id) =>
                `${id}?api_key=${apiKey}&language=en-EN`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDetailsPeopleQuery } = detailsPeopleApi