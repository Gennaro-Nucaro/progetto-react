import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterEsploraPageReducer from "./slice/filter-esplora-page"
import userReducer from './slice/user';
import watchlistReducer from './slice/watchlist';
import preferitiReducer from './slice/preferiti';
import banlistReducer from './slice/banlist';
import resultEsploraPageReducer from './slice/results-esplora-page';
import statisticheReducer from './slice/statistiche';
// RTK QUERY
import { discoverMovieApi } from "./query/discoverMovie"
import { detailsMovieApi } from "./query/detailsMovie"
import { creditsMovieApi } from "./query/creditsMovie"
import { detailsPeopleApi } from "./query/detailsPeople"
import { creditsPeopleApi } from "./query/peopleCredits"
import { movieRecommendationsApi } from "./query/movieRecommendations"
import { similarMovieApi } from "./query/similarMovie"
import { searchMovieApi } from "./query/cercaFIlm"

export const store = configureStore({
  reducer: {
    filterEsploraPage: filterEsploraPageReducer,
    resultEsploraPage: resultEsploraPageReducer,
    user: userReducer,
    watchlist: watchlistReducer,
    preferiti: preferitiReducer,
    banlist: banlistReducer,
    statistiche: statisticheReducer,
    [discoverMovieApi.reducerPath]: discoverMovieApi.reducer,
    [detailsMovieApi.reducerPath]: detailsMovieApi.reducer,
    [creditsMovieApi.reducerPath]: creditsMovieApi.reducer,
    [detailsPeopleApi.reducerPath]: detailsPeopleApi.reducer,
    [creditsPeopleApi.reducerPath]: creditsPeopleApi.reducer,
    [movieRecommendationsApi.reducerPath]: movieRecommendationsApi.reducer,
    [similarMovieApi.reducerPath]: similarMovieApi.reducer,
    [searchMovieApi.reducerPath]: searchMovieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    discoverMovieApi.middleware, detailsMovieApi.middleware, creditsMovieApi.middleware, detailsPeopleApi.middleware,
    creditsPeopleApi.middleware, movieRecommendationsApi.middleware, similarMovieApi.middleware, searchMovieApi.middleware
  )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
