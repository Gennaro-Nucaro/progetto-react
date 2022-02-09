import React, { useState, useCallback, memo } from "react";
import css from "./style.module.css";
//UTILS
import { baseUrlPoster, baseUrlPosterW154 } from "@utils/costants";
import { isLoggedIn } from "@utils/auth";
//LIBS
import { Link } from "react-router-dom";
import cn from "classnames";
//HOOKS
import UseAddItemInPreferitiAndStats from "@hooks/UseAddItemInPreferitiAndStats";
import UseDeleteItemPreferitiAndStats from "@hooks/UseDeleteItemPreferitiAndStats";
//REDUX
import { useAppDispatch, useAppSelector } from "@redux-hooks";
import { IMovieResult } from "@redux-rtkQueries";
import {
  addItemWatchlist,
  deleteItemWatchlist,
  addItemBanlist,
  deleteItemBanlist,
} from "@redux-asyncActions";
import {
  watchlistSelector,
  banlistSelector,
  usermameSelector,
  preferitiSelector,
} from "@redux-slices/slices";
//ICONS
import { GiFilmProjector } from "react-icons/gi";
import { AiOutlineStop } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
//COMP
import Popover from "@components/popover";

const stylePopoverUno = {
  bottom: "-15px",
  right: "-65px",
};
interface CardProps {
  data: IMovieResult;
}

const Card: React.VFC<CardProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { watchlist } = useAppSelector(watchlistSelector);
  const { banlist } = useAppSelector(banlistSelector);
  const { preferiti } = useAppSelector(preferitiSelector);
  const username = useAppSelector(usermameSelector);
  const [open, setOpen] = useState<boolean>(false);

  const { addItemInPreferitiAndStats, loadingAdd } =
    UseAddItemInPreferitiAndStats();

  const { deleteItemInPreferitiAndStats, loadingDel } =
    UseDeleteItemPreferitiAndStats();

  const handlerPreferiti = useCallback(() => {
    if (preferiti.map((e) => +e.idFilm).includes(data.id)) {
      deleteItemInPreferitiAndStats(data.id.toString());
    } else {
      addItemInPreferitiAndStats(data.id.toString());
      if (banlist.map((e) => +e.idFilm).includes(data.id)) {
        dispatch(deleteItemBanlist(data.id.toString()));
      }
    }
  }, [
    dispatch,
    preferiti,
    banlist,
    addItemInPreferitiAndStats,
    deleteItemInPreferitiAndStats,
    data.id,
  ]);

  const handlerItemWatchlist = useCallback(() => {
    if (watchlist.map((e) => +e.idFilm).includes(data.id)) {
      dispatch(deleteItemWatchlist(data.id.toString()));
    } else {
      dispatch(
        addItemWatchlist({
          idFilm: data.id.toString(),
          name: data.title,
          img: baseUrlPosterW154 + data.poster_path,
        })
      );
      if (banlist.map((e) => +e.idFilm).includes(data.id)) {
        dispatch(deleteItemBanlist(data.id.toString()));
      }
    }
  }, [dispatch, data.id, data.poster_path, data.title, watchlist, banlist]);

  const addItemInBanlist = useCallback(() => {
    dispatch(addItemBanlist({ idFilm: data.id.toString(), name: data.title }));

    if (watchlist.map((e) => +e.idFilm).includes(data.id)) {
      dispatch(deleteItemWatchlist(data.id.toString()));
    }

    if (preferiti.map((e) => +e.idFilm).includes(data.id)) {
      deleteItemInPreferitiAndStats(data.id.toString());
    }
  }, [
    watchlist,
    preferiti,
    data.id,
    data.title,
    deleteItemInPreferitiAndStats,
    dispatch,
  ]);

  return (
    <div className={css.card}>
      <div
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={css.imageContainer}
      >
        <img
          className={css.cardImg}
          alt={data.title}
          src={baseUrlPoster + data.poster_path}
        />
        {/*ACTION USER LOGGEDIN*/}
        {open && isLoggedIn() && username && (
          <div className={css.action}>
            <div className={css.footerAction}>
              {/* preferiti actions */}
              {!loadingAdd || !loadingDel ? (
                <Popover
                  style={{
                    bottom: "-15px",
                    right: "-65px",
                  }}
                  list={
                    preferiti.map((e) => +e.idFilm).includes(data.id)
                      ? ["Rimuovi dai preferiti"]
                      : ["Aggiungi ai preferiti"]
                  }
                >
                  <AiFillHeart
                    onClick={handlerPreferiti}
                    className={
                      preferiti.map((e) => +e.idFilm).includes(data.id)
                        ? css.iconActiveHeart
                        : css.icon
                    }
                  />
                </Popover>
              ) : (
                <AiFillHeart
                  onClick={handlerPreferiti}
                  className={css.heartLoading}
                />
              )}
              {/*watchlist actions */}
              <Popover
                style={stylePopoverUno}
                list={
                  watchlist.map((e) => +e.idFilm).includes(data.id)
                    ? ["Rimuovi dalla watchlist"]
                    : ["Aggiungi alla watchlist"]
                }
              >
                <GiFilmProjector
                  onClick={handlerItemWatchlist}
                  className={cn(
                    watchlist.map((e) => +e.idFilm).includes(data.id)
                      ? css.iconActive
                      : css.iconNotActive
                  )}
                />
              </Popover>
              {/*banlist actions */}
              {banlist.map((e) => +e.idFilm).includes(data.id) ? (
                <Popover
                  style={{ bottom: "-15px", right: "-50px" }}
                  list={["Suggerisci ancora"]}
                >
                  <AiOutlineStop
                    onClick={() => {
                      dispatch(deleteItemBanlist(data.id.toString()));
                    }}
                    className={css.iconStopActive}
                  />
                </Popover>
              ) : (
                <Popover
                  style={{ bottom: "-15px", right: "-50px" }}
                  list={["Non suggerire più"]}
                >
                  <AiOutlineStop
                    onClick={addItemInBanlist}
                    className={css.icon}
                  />
                </Popover>
              )}
            </div>
          </div>
        )}
        {/* ACTION USER NOT LOGGEDIN*/}
        {open && !isLoggedIn() && !username && (
          <div className={css.action}>
            <div className={css.btnContainer}>
              <Link to="/registrati">
                <button className={css.btnRegister}>Registrati</button>
              </Link>
            </div>
            <div className={css.footerAction}>
              <GiFilmProjector className={css.icon} />
              <AiOutlineStop className={css.icon} />
              <AiFillHeart className={css.icon} />
            </div>
          </div>
        )}
      </div>
      {/* FOOTER */}
      <Link to={`/info/${data.id}`}>
        <div className={css.footer}>
          <p className={css.title}>
            {data.title.slice(0, 52)}
            {data.title.length > 51 && <span>...</span>}
          </p>
          <p className={css.years}>
            {data.release_date ? data.release_date.split("-")[0] : ""}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default memo(Card);
