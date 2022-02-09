import React, { useState } from "react";
import css from "./style.module.css";
//COMP ESTER
import { Spinner } from "@components/loading";
import Film from "@components/filmCarousel/components/card";
//REDUX
import {
  IResSearchMovie,
  IResultCercaFilm,
  useSearchMovieQuery,
} from "@redux-rtkQueries";
//ICONS
import { FaSearch } from "react-icons/fa";
//UTILS
import ScrollToTop from "@utils/ScrollTop";

const Cerca: React.VFC = () => {
  const [film, setFilm] = useState("Thor: The Dark World");
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(true);

  const searchMovie = useSearchMovieQuery<IResSearchMovie>(query, {
    skip: skip,
  });

  const cercaFilm = () => {
    if (film.length >= 2) {
      setQuery(film);
      setSkip(false);
    }
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (film.length >= 2) {
      setQuery(film);
      setSkip(false);
    }
  };

  return (
    <div className={css.page}>
      <ScrollToTop />
      <h1 className={css.title}>Cerca un film</h1>

      <form onSubmit={submit} className={css.containerInput}>
        <input
          minLength={2}
          maxLength={50}
          onChange={(e) => {
            setFilm(e.target.value);
          }}
          className={css.input}
          type="text"
          placeholder="Cerca..."
        />
        <FaSearch onClick={cercaFilm} className={css.icon} />
      </form>
      <div className={css.containerResult}>
        {!skip && (
          <h1 className={css.titleQuery}>Risultati trovati per: {query}</h1>
        )}

        {searchMovie.isLoading ? (
          <span className={css.loading}>
            <Spinner size={120} />
          </span>
        ) : (
          <>
            <div className={css.risultati}>
              {searchMovie.isSuccess &&
                searchMovie.data.total_results !== 0 &&
                searchMovie.data.results
                  .filter((film: IResultCercaFilm) => film.poster_path)
                  .map((film: IResultCercaFilm) => {
                    return <Film key={film.id} data={film} />;
                  })}
            </div>
            <div className={css.zeroResult}>
              {searchMovie.isSuccess &&
                searchMovie.data.total_results === 0 && (
                  <div>Nessun film trovato... </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cerca;
