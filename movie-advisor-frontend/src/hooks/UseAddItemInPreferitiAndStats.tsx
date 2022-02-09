import { useState, useEffect, useMemo } from "react";
import { baseUrlPosterW154 } from "@utils/costants";
//REDUX
import { useAppDispatch, useAppSelector } from "@redux-hooks";
import { addItemStats, addItemPreferiti } from "@redux-asyncActions";
import {
  IResCreditMovie,
  IResDetailsMovie,
  useGetCreditsMovieQuery,
  useGetDetailsMovieQuery,
} from "@redux-rtkQueries";
import { statisticheSelector, preferitiSelector } from "@redux-slices/slices";

const useAddItemInStats = () => {
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = useState(1);
  const [idFilm, setIdfilm] = useState("");
  const [loading, setLoading] = useState(false);
  const stats = useAppSelector(statisticheSelector);
  const pref = useAppSelector(preferitiSelector);

  const getDetailsMovie = useGetDetailsMovieQuery<IResDetailsMovie>(idFilm, {
    skip: idFilm === "",
  });
  const getCreditsMovie = useGetCreditsMovieQuery<IResCreditMovie>(idFilm, {
    skip: idFilm === "",
  });

  const addItemInPreferitiAndStats = (id: string) => {
    setLoading(true);
    setIdfilm(id);
    setRefresh(refresh + 1);
  };

  const loadingAdd = useMemo(
    () =>
      getDetailsMovie.isLoading ||
      getCreditsMovie.isLoading ||
      stats.loading ||
      pref.loading ||
      loading,
    [getDetailsMovie, getCreditsMovie, stats, pref, loading]
  );

  useEffect(() => {
    if (
      getDetailsMovie.isSuccess &&
      getCreditsMovie.isSuccess &&
      getDetailsMovie.status === "fulfilled" &&
      getCreditsMovie.status === "fulfilled"
    ) {
      dispatch(
        addItemStats({
          filmList: {
            name: getDetailsMovie.data.title,
            id: idFilm,
          },
          genereList: getDetailsMovie.data.genres.map((e) => ({
            name: e.name,
            id: idFilm,
          })),
          anniList: [
            {
              name: getDetailsMovie.data.release_date.split("-")[0],
              id: idFilm,
            },
          ],
          attoriList: getCreditsMovie.data.cast
            .slice(0, 10)
            .filter(
              (ele) => ele.profile_path && ele.known_for_department === "Acting"
            )
            .map((e) => ({
              name: e.name,
              id: e.id.toString(),
              img: e.profile_path,
            })),
          directorsList: [
            {
              name:
                getCreditsMovie.data.crew.find((ele) => ele.job === "Director")
                  ?.name || "null",
              id:
                getCreditsMovie.data.crew
                  .find((ele) => ele.job === "Director")
                  ?.id.toString() || "null",
              img:
                getCreditsMovie.data.crew.find((ele) => ele.job === "Director")
                  ?.profile_path || "null",
            },
          ],
        })
      );
      dispatch(
        addItemPreferiti({
          name: getDetailsMovie.data.title,
          idFilm: idFilm,
          img: baseUrlPosterW154 + getDetailsMovie.data.poster_path,
        })
      );
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, getDetailsMovie.data, getCreditsMovie.data, refresh]);

  return {
    addItemInPreferitiAndStats,
    loadingAdd,
  };
};
export default useAddItemInStats;
