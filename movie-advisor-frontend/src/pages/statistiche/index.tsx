import React, { useEffect, Fragment } from "react";
import css from "./style.module.css";
import ScrollToTop from "@utils/ScrollTop";
//LIBS
import { Link } from "react-router-dom";
import cn from "classnames";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { statisticheSelector } from "@redux-slices/statistiche";
import { getStats } from "@redux-asyncActions";
//COMP INTERN
import GeneriChart from "./components/generiChart";
import AnniChart from "./components/anniChart";
//COMP ESTER
import TopPeople from "@components/peopleStatsCarousel";


const Stats: React.VFC = () => {
  const { attoriList, directorsList, isSuccess, loading, filmList } =
    useAppSelector(statisticheSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);
  
  return (
    <div className={cn(css.page, filmList.length !== 0 && css.bG)}>
      <ScrollToTop/>
      {loading ? null : isSuccess && filmList.length === 0 ? (
        <div className={css.noStats}>
          <h1>
            Nessuna statistica disponibile
            <br />
            Per iniziare a generare statistiche aggiungi film ai preferiti
            <br />
            Vai sulla{" "}
            <Link className="link" to={"/"}>
              pagina esplora{" "}
            </Link>
            o nella{" "}
            <Link className="link" to={"/cerca"}>
              pagina cerca{" "}
            </Link>
            per inserire film nei preferiti
          </h1>
        </div>
      ) : (
        <Fragment>
          <GeneriChart />
          <AnniChart />
          <div className={css.peopleContainer}>
            <h3 className={css.title}>TOP ACTORS</h3>
            <TopPeople
              data={[...attoriList]
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 15)}
            />
            <h3 className={css.title}>TOP DIRECTORS</h3>
            <TopPeople
              data={[...directorsList]
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 15)}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Stats;
