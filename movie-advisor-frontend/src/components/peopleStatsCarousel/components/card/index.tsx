import React from "react";
import css from "./style.module.css";
import { baseUrlPoster } from "@utils/costants";
import { Link } from "react-router-dom";

interface IProps {
  name: string;
  img?: string;
  count: number;
  id?: string;
}

interface IElement {
  element: IProps;
}
const Card: React.VFC<IElement> = ({ element }) => {
  return (
    <div className={css.card}>
      <div>
        <img
          className={css.cardImg}
          alt={element.name}
          src={baseUrlPoster + element.img}
        />
      </div>
      <Link to={`/person/${element.id}`}>
        <p className={css.title}> {element.name}</p>
        <p className={css.counter}>In {element.count} film</p>
      </Link>
    </div>
  );
};

export default Card
