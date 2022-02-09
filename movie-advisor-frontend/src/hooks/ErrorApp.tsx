import { useEffect, useState } from "react";
//REDUX
import { useAppSelector } from "@redux-hooks";
import {
  banlistSelector,
  filterEsploraPageSelector,
  preferitiSelector,
  statisticheSelector,
  userState,
  watchlistSelector,
} from "@redux-slices/slices";

const ErrorApp = () => {
  const [isError, setIsError] = useState(false);

  const banlist = useAppSelector(banlistSelector);
  const filterEP = useAppSelector(filterEsploraPageSelector);
  const preferiti = useAppSelector(preferitiSelector);
  const stats = useAppSelector(statisticheSelector);
  const user = useAppSelector(userState);
  const watchlist = useAppSelector(watchlistSelector);

  useEffect(() => {
    setIsError(
      [
        banlist.isError,
        preferiti.isError,
        filterEP.errorState.error,
        stats.isError,
        user.isError,
        watchlist.isError,
      ].some((e) => e === true)
    );
  }, [
    banlist.isError,
    filterEP.errorState.error,
    preferiti.isError,
    stats.isError,
    user.isError,
    watchlist.isError,
  ]);

  return { isError };
};

export default ErrorApp;
