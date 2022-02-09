import React, { useEffect, useState, useRef } from "react";
import css from "./style.module.css";
import { isLoggedIn } from "@utils/auth";
import ScrollToTop from "@utils/ScrollTop";
//LIBS
import cn from "classnames";
//REDUX
import { useGetMoviesQuery, IResDiscoverMovie } from "@redux-rtkQueries";
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import {
  filterEsploraPageSelector,
  banlistSelector,
  usermameSelector,
  resultSelector,
  accumulatorResult,
  clearResult,
  stopLoading,
} from "@redux-slices/slices";
//EXTERNALS COMPONENTS
import FilmCarousel from "@components/filmCarousel";
import { Spinner } from "@components/loading";
import Film from "@components/filmCarousel/components/card";
//INTERNAL COMPONENTS
import Filter from "./components/filter";
//ICONS
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BiDotsHorizontal } from "react-icons/bi";

const Esplora: React.VFC = () => {
  const { filterForQuery } = useAppSelector(filterEsploraPageSelector);
  const user = useAppSelector(usermameSelector);
  const { result, loading } = useAppSelector(resultSelector);
  const banlist = useAppSelector(banlistSelector);
  const [page, setPage] = useState(1);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  //test icone
  const [active, setActive] = useState({
    iconOne: true,
    iconTwo: false,
  });

  const getMovie = useGetMoviesQuery<IResDiscoverMovie>({
    ...filterForQuery,
    page: page,
  });

  useEffect(() => {
    if (isMounted.current) {
      setPage(1);
      dispatch(clearResult());
    }
  }, [dispatch, filterForQuery]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
    if (getMovie.isSuccess && banlist.isSuccess && isMounted.current) {
      //accumulo i risultati e attivo il loading
      dispatch(
        accumulatorResult(
          getMovie.data.results.filter(
            (film) =>
              !banlist.banlist
                .map((ele: any) => ele.idFilm)
                .includes(film.id.toString())
          )
        )
      );
    }
    }
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line
  }, [dispatch, getMovie.data, banlist.isSuccess]);

  useEffect(() => {
    if (getMovie.isSuccess) {
      //fermo il loading
      if (result.length >= 40 || getMovie.data.total_results <= 40) {
        dispatch(stopLoading());
      }
      //carico una nuova pagina
      if (
        result.length < 40 &&
        // result.length >= 1 &&
        getMovie.data.total_results > 40 &&
        page < getMovie.data.total_pages
      ) {
        setPage(page + 1);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, result]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const handlerIconsActived = (nameIcon: string) => {
    if (nameIcon === "iconOne") {
      setActive({
        iconOne: true,
        iconTwo: false,
      });
    } else {
      setActive({
        iconOne: false,
        iconTwo: true,
      });
    }
  };


  return (
    <div className={css.page}>
      <ScrollToTop />
      {/* FILTER-HEADER */}
      <Filter />
      {/*ICONA FILTER RISULTATI - GRIGLIA O CAROUSEL */}
      <div className={css.iconsArea}>
        <BiDotsHorizontal
          onClick={() => {
            handlerIconsActived("iconOne");
          }}
          className={cn(css.iconOne, active.iconOne && css.iconActive)}
        />
        <BsFillGrid3X3GapFill
          onClick={() => {
            handlerIconsActived("iconTwo");
          }}
          className={cn(css.iconTwo, active.iconTwo && css.iconActive)}
        />
      </div>

      {/* RISULTATI */}

      {/* {getMovie.isLoading || getMovie.isFetching  ? ( */}
      {getMovie.isLoading ? null : loading ? (
        <span className={css.loading}>
          <Spinner size={120} />
        </span>
      ) : user && isLoggedIn() ? (
        !loading &&
        result.length !== 0 &&
        //UTENTE LOGGATO
        (active.iconOne ? (
          // risultati mostrati - in carousel
          <div className={css.containerCarousel}>
            {<FilmCarousel title="Film" data={result} />}
          </div>
        ) : (
          // risultati mostrati - a griglia
          <>
            <h1 className={css.titleResGri}>Film</h1>
            <div className={css.risultatiGriglia}>
              {result
                .filter((film) => film.poster_path)
                .map((film) => (
                  <Film key={film.id} data={film} />
                ))}
            </div>
          </>
        ))
      ) : // UTENTE NON LOGGATO
      // res a carousel
      active.iconOne ? (
        <div className={css.containerCarousel}>
          {<FilmCarousel title="Film" data={getMovie.data.results} />}
        </div>
      ) : (
        //res a griglia
        <>
          <h1 className={css.titleResGri}>Film</h1>
          <div className={css.risultatiGriglia}>
            {getMovie.data.results
              .filter((film) => film.poster_path)
              .map((film) => {
                return <Film key={film.id} data={film} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Esplora;
