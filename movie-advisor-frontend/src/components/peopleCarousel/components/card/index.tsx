import React, { memo } from "react";
import css from "./style.module.css";
//UTILS
import { baseUrlPoster } from "@utils/costants";
//LIBS
import { Link } from "react-router-dom";
//REDUX
import { ICastCreditsMovie } from "@redux-rtkQueries";
interface CardProps {
  data: ICastCreditsMovie;
}

const Card: React.VFC<CardProps> = ({ data }) => {
  return (
    <div className={css.card}>
      <div>
        <img
          className={css.cardImg}
          alt={data.name}
          src={baseUrlPoster + data.profile_path}
        />
      </div>
      <Link to={`/person/${data.id}`}>
        <p className={css.title}> {data.name}</p>
      </Link>
      <p className={css.character}> {data.character}</p>
    </div>
  );
};

export default memo(Card);
