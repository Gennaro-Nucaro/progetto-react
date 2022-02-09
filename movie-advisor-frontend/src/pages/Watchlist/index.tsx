import React, { useEffect, useState, memo } from "react";
import css from "./style.module.css";
import { Link } from "react-router-dom";
import ScrollToTop from "@utils/ScrollTop";
//HOOKS
import UseAddItemInPreferitiAndStats from "@hooks/UseAddItemInPreferitiAndStats";
import UseDeleteItemPreferitiAndStats from "@hooks/UseDeleteItemPreferitiAndStats";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { watchlistSelector, preferitiSelector } from "@redux-slices/slices";
import { IItemWatchList } from "@redux-slices/watchlist/interface";
import { IItemPreferiti } from "@redux-slices/preferiti/interface";
import {
  deleteItemWatchlist,
  getWatchlist,
} from "@redux-asyncActions";
//COMP INTER
import VoidList from "./component/messageVoidList";
//COMP ESTER
import Popover from "@components/popover";
import { Spinner } from "@components/loading";
//ICONS
import { AiFillDelete } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";

const styleDelete = {
  top: 33,
  right: -80,
};
const stylePreferiti = {
  top: 33,
  right: -60,
};

const WatchList: React.VFC = () => {
  const dispatch = useAppDispatch();
  const { watchlist, loading } = useAppSelector(watchlistSelector);
  const { preferiti } = useAppSelector(preferitiSelector);
  const [query, setQuery] = useState("");
  const [list, setList] = useState<IItemWatchList[]>([]);

  const { addItemInPreferitiAndStats } = UseAddItemInPreferitiAndStats();
  const { deleteItemInPreferitiAndStats } = UseDeleteItemPreferitiAndStats();

  useEffect(() => {
    if (!watchlist) {
      dispatch(getWatchlist());
    }
  }, [dispatch,watchlist]);

  useEffect(() => {
    if (watchlist) {
      setList(watchlist);
    }
  }, [watchlist]);

  useEffect(() => {
    if (query.length > 2) {
      setList(
        watchlist.filter((film) =>
          film.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setList(watchlist);
    }
  }, [query, watchlist]);

  const addItemInPreferiti = (item: IItemPreferiti) => {
    if (!preferiti.some((e) => e.idFilm === item.idFilm)) {
      addItemInPreferitiAndStats(item.idFilm);
    }
  };
  const deleteItemPreferitiWS = (id: string) => {
    deleteItemInPreferitiAndStats(id)
  };

  return (
    <div className={css.page}>
      <ScrollToTop />
      <div className={css.header}>
        <h1 className={css.title}>La Mia Watchlist</h1>
      </div>
      <div className={css.containerInput}>
        <input
          minLength={2}
          maxLength={50}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className={css.input}
          type="text"
          placeholder="Cerca..."
        />
      </div>
      {watchlist.length === 0 && <VoidList />}
      <div className={css.listContainer}>
        <ul>
          {loading ? (
            <Spinner />
          ) : (
            list.map((ele) => (
              <li className={css.list} key={ele.idFilm}>
                <div className={css.imageContainer}>
                  <img alt="" src={ele.img} />
                </div>
                <div className={css.titleContainer}>
                  <h3 className={css.titleFilm}>
                    <Link to={`/info/${ele.idFilm}`}>{ele.name}</Link>
                  </h3>
                </div>
                {/* icons */}
                <div className={css.iconsContainer}>
                  {preferiti.map((e) => +e.idFilm).includes(+ele.idFilm) ? (
                    <Popover
                      style={{
                        top: 33,
                        right: -70,
                      }}
                      list={["Rimuovi dai preferiti"]}
                    >
                      <BsHeartFill
                        onClick={() => {
                          deleteItemPreferitiWS(ele.idFilm);
                        }}
                        className={css.iconActiveHeart}
                      />
                    </Popover>
                  ) : (
                    <Popover
                      style={stylePreferiti}
                      list={["Aggiungi ai preferiti"]}
                    >
                      <BsHeartFill
                        className={css.icon}
                        onClick={() =>
                          addItemInPreferiti({
                            idFilm: ele.idFilm,
                            img: ele.img,
                            name: ele.name,
                          })
                        }
                      />
                    </Popover>
                  )}

                  <Popover
                    style={styleDelete}
                    list={["Elimina dalla watchlist"]}
                  >
                    <AiFillDelete
                      onClick={() => dispatch(deleteItemWatchlist(ele.idFilm))}
                      className={css.icon}
                    />
                  </Popover>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default memo(WatchList);
