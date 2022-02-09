import React, { useMemo } from "react";
import css from "./style.module.css";
import {
  baseUrlSfondo,
  baseUrlPoster,
  baseUrlPosterW154,
} from "@utils/costants";
import { isLoggedIn } from "@utils/auth";
//LIB
import { useParams, Link } from "react-router-dom";
import cn from "classnames";
//REDUX
import { useAppDispatch, useAppSelector } from "@redux-hooks";
import {
  watchlistSelector,
  banlistSelector,
  preferitiSelector,
  usermameSelector,
} from "@redux-slices/slices";
import {
  useGetDetailsMovieQuery,
  IResDetailsMovie,
  useGetCreditsMovieQuery,
  IResCreditMovie,
  useGetMovieRecommendationsQuery,
  IResMovieRecommendations,
  useGetSimilarMovieApiQuery,
  IResSimilarMovie,
} from "@redux-rtkQueries";
import {
  addItemWatchlist,
  deleteItemWatchlist,
  addItemBanlist,
  deleteItemPreferiti,
  deleteItemBanlist,
} from "@redux-asyncActions";

import UseAddItemInPreferitiAndStats from "@hooks/UseAddItemInPreferitiAndStats";
import UseDeleteItemPreferitiAndStats from "@hooks/UseDeleteItemPreferitiAndStats";
//COMP
import PeopleCarousel from "@components/peopleCarousel";
import FilmShowCarousel from "@components/filmCarousel";
import Popover from "@components/popover";
//UTILS
import ScrollToTop from "@utils/ScrollTop";
//ICONS
import { GiFilmProjector } from "react-icons/gi";
import { AiOutlineStop } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

interface IItem {
  idFilm: string;
  name: string;
  img?: string;
}
const InfoFilm: React.VFC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { watchlist } = useAppSelector(watchlistSelector);
  const { banlist } = useAppSelector(banlistSelector);
  const { preferiti } = useAppSelector(preferitiSelector);
  const username = useAppSelector(usermameSelector);
  const getDetailsMovie = useGetDetailsMovieQuery<IResDetailsMovie>(id);
  const getCreditsMovie = useGetCreditsMovieQuery<IResCreditMovie>(id);
  const getMovieRecommendations =
    useGetMovieRecommendationsQuery<IResMovieRecommendations>(id);
  const getSimilarMovie = useGetSimilarMovieApiQuery<IResSimilarMovie>(id);

  const { addItemInPreferitiAndStats, loadingAdd } =
    UseAddItemInPreferitiAndStats();

  const { deleteItemInPreferitiAndStats, loadingDel } =
    UseDeleteItemPreferitiAndStats();

  const handlerPreferiti = (idFilm: string) => {
    if (preferiti.map((e) => +e.idFilm).includes(+id)) {
      deleteItemInPreferitiAndStats(idFilm);
    } else {
      addItemInPreferitiAndStats(idFilm);
      if (banlist.map((e) => +e.idFilm).includes(+id)) {
        dispatch(deleteItemBanlist(id));
      }
    }
  };

  const handlerItemWatchlist = ({ idFilm, name, img }: IItem) => {
    if (!watchlist.map((e) => +e.idFilm).includes(+idFilm)) {
      dispatch(
        addItemWatchlist({
          idFilm: idFilm.toString(),
          name,
          img: baseUrlPosterW154 + img,
        })
      );
      if (banlist.map((e) => +e.idFilm).includes(+idFilm)) {
        dispatch(deleteItemBanlist(idFilm.toString()));
      }
    } else {
      dispatch(deleteItemWatchlist(idFilm.toString()));
    }
  };

  const addItemInBanlist = ({ idFilm, name }: IItem) => {
    dispatch(addItemBanlist({ idFilm: idFilm.toString(), name }));
    if (watchlist.map((e) => +e.idFilm).includes(+idFilm)) {
      dispatch(deleteItemWatchlist(idFilm.toString()));
    }
    if (preferiti.map((e) => +e.idFilm).includes(+idFilm)) {
      dispatch(deleteItemPreferiti(idFilm.toString()));
      deleteItemInPreferitiAndStats(idFilm.toString());
    }
  };

  const styleSfondo = useMemo(
    () => ({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)),url(${
        getDetailsMovie.isSuccess
          ? baseUrlSfondo + getDetailsMovie.data.backdrop_path
          : ""
      })`,
      backgroundSize: "cover",
      height: "100%",
    }),
    [getDetailsMovie]
  );

  const stylePopover = {
    bottom: "-35px",
    right: "-55px",
  };

  const stylePopoverHeart = {
    bottom: "-35px",
    right: "-45px",
  };

  return (
    <div className={css.page}>
      <ScrollToTop />
      <div>
        {getDetailsMovie.isLoading ||
        getCreditsMovie.isLoading ||
        getDetailsMovie.isFetching ? null : (
          <>
            {/* HEADER - SFONDO   */}
            {getDetailsMovie.isSuccess && (
              <>
                {/* SX DELLO SFONDO  - IMG*/}
                <div style={styleSfondo} className={css.sfondo}>
                  <div className={css.poster}>
                    <img
                      className={css.img}
                      alt={""}
                      src={baseUrlPoster + getDetailsMovie.data.poster_path}
                    ></img>
                  </div>
                  {/* INFO LATO DX DELLO SFONDO  */}
                  <div className={css.info}>
                    <div className={css.containerTitle}>
                      <h2 className={css.title}>
                        {getDetailsMovie.data.title}
                        <span className={css.year}>
                          ({getDetailsMovie.data.release_date.split("-")[0]})
                        </span>
                      </h2>
                      <h2 className={css.titleVA}>
                        Voto medio:
                        <span className={css.voteAverage}>
                          {getDetailsMovie.data.vote_average}
                        </span>
                      </h2>
                    </div>

                    {/*area icone   */}
                    {isLoggedIn() && username && (
                      <div className={css.iconsArea}>
                        {/* preferiti actions */}
                        {!loadingAdd || !loadingDel ? (
                          <Popover
                            style={stylePopoverHeart}
                            list={
                              preferiti.map((e) => +e.idFilm).includes(+id)
                                ? ["Rimuovi dai preferiti"]
                                : ["Aggiungi ai preferiti"]
                            }
                          >
                            <AiFillHeart
                              onClick={() => {
                                handlerPreferiti(id.toString());
                              }}
                              className={cn(
                                preferiti.map((e) => +e.idFilm).includes(+id)
                                  ? css.iconActiveHeart
                                  : css.iconNotActive
                              )}
                            />
                          </Popover>
                        ) : (
                          <AiFillHeart className={css.loadingHeart} />
                        )}
                        {/*watchlist actions */}
                        <Popover
                          style={stylePopover}
                          list={
                            watchlist.map((e) => +e.idFilm).includes(+id)
                              ? ["Rimuovi dalla watchlist"]
                              : ["Aggiungi alla watchlist"]
                          }
                        >
                          <GiFilmProjector
                            onClick={() => {
                              handlerItemWatchlist({
                                idFilm: id.toString(),
                                name: getDetailsMovie.data.title,
                                img: getDetailsMovie.data.poster_path,
                              });
                            }}
                            className={cn(
                              watchlist.map((e) => +e.idFilm).includes(+id)
                                ? css.iconActive
                                : css.iconNotActive
                            )}
                          />
                        </Popover>
                        {banlist.map((e) => +e.idFilm).includes(+id) ? (
                          <Popover
                            style={stylePopover}
                            list={["Suggerisci ancora"]}
                          >
                            <AiOutlineStop
                              onClick={() => {
                                dispatch(
                                  deleteItemBanlist(
                                    getDetailsMovie.data.id.toString()
                                  )
                                );
                              }}
                              className={css.iconStopActive}
                            />
                          </Popover>
                        ) : (
                          <Popover
                            style={stylePopover}
                            list={["Non suggerire più"]}
                          >
                            <AiOutlineStop
                              onClick={() => {
                                addItemInBanlist({
                                  idFilm: id.toString(),
                                  name: getDetailsMovie.data.title,
                                });
                              }}
                              className={css.icon}
                            />
                          </Popover>
                        )}
                      </div>
                    )}
                    {/*  fine area icone*/}
                    <p className={css.infoFooter}>
                      {getDetailsMovie.data.release_date}({" "}
                      {getDetailsMovie.data.original_language} ) -{" "}
                      {getDetailsMovie.data.genres.map((ele) => ele.name + " ")}{" "}
                      - {getDetailsMovie.data.runtime} min
                    </p>
                    <p style={{ fontSize: 20, marginTop: 10 }}>
                      <Link
                        to={`/person/${
                          getCreditsMovie.data.crew.find(
                            (ele) => ele.job === "Director"
                          )?.id || "108"
                        }`}
                      >
                        Director{" "}
                        {getCreditsMovie.data.crew.find(
                          (ele) => ele.job === "Director"
                        )?.name || ""}
                      </Link>
                    </p>
                    <p className={css.tagline}>
                      {getDetailsMovie.data.tagline}
                    </p>
                    <p className={css.trama}>
                      <span style={{ fontSize: 25 }}>Trama </span>
                      {getDetailsMovie.data.overview}
                    </p>
                  </div>
                </div>

                {getMovieRecommendations.isLoading || getSimilarMovie.isLoading
                  ? null
                  : getDetailsMovie.isSuccess &&
                    getMovieRecommendations.isSuccess &&
                    getCreditsMovie.isSuccess &&
                    getSimilarMovie.isSuccess && (
                      <>
                        <PeopleCarousel
                          title="Cast"
                          data={getCreditsMovie.data.cast
                            .slice(0, 15)
                            .filter((ele) => ele.profile_path)}
                        />
                        {getSimilarMovie.data.results.length > 0 && (
                          <FilmShowCarousel
                            title={`Film simili`}
                            data={getSimilarMovie.data.results}
                          />
                        )}
                        {getMovieRecommendations.data.results.length > 0 && (
                          <FilmShowCarousel
                            title={`Se ti è piaciuto ${getDetailsMovie.data.title} ti suggeriamo`}
                            data={getMovieRecommendations.data.results}
                          />
                        )}
                      </>
                    )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoFilm;
