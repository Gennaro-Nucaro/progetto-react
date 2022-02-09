import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { Link } from "react-router-dom";
import ScrollToTop from "@utils/ScrollTop";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { preferitiSelector } from "@redux-slices/preferiti";
import { IItemPreferiti } from "@redux-slices/preferiti/interface";
import {
  getPreferiti,
} from "@redux-asyncActions";
//COMP ESTER
import Popover from "@components/popover";
//ICONS
import { TiDeleteOutline } from "react-icons/ti";
//HOOKS
import UseDeleteItemPreferitiAndStats from "@hooks/UseDeleteItemPreferitiAndStats";

const styleDelete = {
  top: 39,
  right: -60,
};

const Preferiti: React.VFC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [list, setList] = useState<IItemPreferiti[]>([]);
  const { preferiti, loading, isSuccess } = useAppSelector(preferitiSelector);

  const { deleteItemInPreferitiAndStats } =
    UseDeleteItemPreferitiAndStats();

  useEffect(() => {
    dispatch(getPreferiti());
  }, [dispatch]);

  useEffect(() => {
    if (preferiti) {
      setList(preferiti);
    }
  }, [preferiti]);

  useEffect(() => {
    if (query.length > 2) {
      setList(
        preferiti.filter((film) =>
          film.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setList(preferiti);
    }
  }, [query, preferiti]);

  const deleteItem = (id: string) => {
    deleteItemInPreferitiAndStats(id)
  };

  return (
    <div className={css.page}>
      <ScrollToTop />
      <div className={css.header}>
        <h1 className={css.title}>I miei film preferiti</h1>
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
      {loading
        ? null
        : isSuccess &&
          preferiti.length === 0 && (
            <div className={css.noPreferiti}>
              <h1>
                Nessun film nei preferiti <br />
                Per iniziare vai su{" "}
                <Link className="link" to={"/cerca"}>
                  pagina cerca
                </Link>{" "}
                o{" "}
                <Link className="link" to={"/"}>
                  pagina esplora
                </Link>
              </h1>
            </div>
          )}
      <div className={css.listContainer}>
        <ul>
          {loading
            ? null
            : isSuccess &&
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
                  <div className={css.iconsContainer}>
                    <Popover
                      style={styleDelete}
                      list={["Elimina dai preferiti"]}
                    >
                      <TiDeleteOutline
                        onClick={() => deleteItem(ele.idFilm)}
                        className={css.icon}
                      />
                    </Popover>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Preferiti;
