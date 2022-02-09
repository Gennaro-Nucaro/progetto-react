import React, { Fragment, useState, useEffect, useMemo } from "react";
import css from "./style.module.css";
import { baseUrlSfondoW780, baseUrlPoster } from "@utils/costants";
import ScrollToTop from "@utils/ScrollTop";
//LIB
import { useParams } from "react-router-dom";
//REDUX
import {
  IResCreditsPeople,
  useGetDetailsPeopleQuery,
  IResDetailsPerson,
  useGetCreditsPeopleQuery,
} from "@redux-rtkQueries";
//COMP EST
import FilmCarousel from "@components/filmCarousel";

const InfoPerson: React.VFC = () => {
  let { id } = useParams<{ id: string }>();
  const getDetailsPerson = useGetDetailsPeopleQuery<IResDetailsPerson>(id);
  const getCreditPeople = useGetCreditsPeopleQuery<IResCreditsPeople>(id);
  const [film, setFilm] = useState<any>([]);

  useEffect(() => {
    if (getCreditPeople.isSuccess) {
      setFilm(
        getCreditPeople.data.cast
          .filter(
            (ele) =>
              ele.media_type === "movie" &&
              ele.backdrop_path &&
              ele.vote_count > 50
          )
          .slice(0, 25)
          .map((ele) => {
            return {
              id: ele.id,
              title: ele.title,
              poster_path: ele.poster_path,
              release_date: ele.release_date,
              backdrop_path: ele.backdrop_path,
            };
          })
      );
    }
    // eslint-disable-next-line
  }, [getDetailsPerson, getCreditPeople.isSuccess]);

  const style = useMemo(
    () => ({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)),url(${
        getCreditPeople.isSuccess && film.length > 0
          ? baseUrlSfondoW780 +
            film[Math.floor(Math.random() * film.length)].backdrop_path
          : ""
      })`,
      backgroundSize: "cover",
      height: "100%",
    }),
    [getCreditPeople.isSuccess, film]
  );

  return (
    <div className={css.page}>
      <ScrollToTop />
      {getDetailsPerson.isLoading || getCreditPeople.isLoading
        ? null
        : getDetailsPerson.isSuccess &&
          getCreditPeople.isSuccess && (
            <Fragment>
              <div style={style} className={css.sfondo}>
                {/*HEADER SFONDO*/}
                <div className={css.poster}>
                  <img
                    className={css.img}
                    alt={""}
                    src={baseUrlPoster + getDetailsPerson.data.profile_path}
                  ></img>
                </div>
                {/* LATO DX DELLO SFONDO */}
                <div className={css.info}>
                  <div className={css.title}>{getDetailsPerson.data.name}</div>
                  <div className={css.infoPersona}>
                    <p>
                      famoso/a per {getDetailsPerson.data.known_for_department}{" "}
                    </p>
                    <p>
                      data di nascita {getDetailsPerson.data.birthday}{" "}
                      {getDetailsPerson.data.deathday}{" "}
                      {getDetailsPerson.data.place_of_birth}
                    </p>
                    <p className={css.biografia}>
                      <span>Biografia</span>
                      {getDetailsPerson.data.biography}
                    </p>
                  </div>
                </div>
              </div>
              {/* BODY - FILM */}
              <FilmCarousel title="Film" data={film} />
            </Fragment>
          )}
    </div>
  );
};

export default InfoPerson;
