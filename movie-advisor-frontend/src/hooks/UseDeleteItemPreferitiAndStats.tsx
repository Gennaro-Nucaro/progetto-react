import { useState, useEffect, useMemo } from "react";
//REDUX
import { useAppDispatch, useAppSelector } from "@redux-hooks";
import { deleteItemStats, deleteItemPreferiti } from "@redux-asyncActions";
import {
  IResCreditMovie,
  IResDetailsMovie,
  useGetCreditsMovieQuery,
  useGetDetailsMovieQuery,
} from "@redux-rtkQueries";
import { statisticheSelector, preferitiSelector } from "@redux-slices/slices";

const useDeleteItemInStats = () => {
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

  const deleteItemInPreferitiAndStats = (id: string) => {
    setLoading(true);
    setIdfilm(id);
    setRefresh(refresh + 1);
  };

  const loadingDel = useMemo(
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
        deleteItemStats({
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
              id: idFilm,
              img:
                getCreditsMovie.data.crew.find((ele) => ele.job === "Director")
                  ?.profile_path || "null",
            },
          ],
        })
      );
      dispatch(deleteItemPreferiti(idFilm));
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, getDetailsMovie.data, getCreditsMovie.data, refresh]);

  return {
    deleteItemInPreferitiAndStats,
    loadingDel,
  };
};
export default useDeleteItemInStats;
