import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from "@utils/costants"



export const creditsPeopleApi = createApi({
    reducerPath: 'creditsPeopleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/person` }),
    endpoints: (builder) => ({
        getCreditsPeople: builder.query<string, string>({
            query: (id) =>
                `${id}/combined_credits?api_key=${apiKey}&language=it-IT`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCreditsPeopleQuery } = creditsPeopleApi