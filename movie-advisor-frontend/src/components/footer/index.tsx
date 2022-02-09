import React, { memo } from "react";
import css from "./style.module.css";

const Footer: React.VFC = () => {
  return (
    <div className={css.footer}>
      <p>
        This website was created and developed by Gennaro Nucaro. <br />
        This website does not make any use of cookies of any kind, and no personal data is processed.
        <br />
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <div>
        <img
          className={css.img}
          alt=""
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
        ></img>
      </div>
    </div>
  );
};

export default memo(Footer);
