import React, { memo } from "react";
import css from "./style.module.css";
import { Link } from "react-router-dom";

const VoidList: React.VFC = () => {
  return (
    <div className={css.component}>
      Per iniziare vai su
      <Link className="link" to="/">
        {" "}
        pagina esplora{" "}
      </Link>{" "}
      o nella{" "}
      <Link className="link" to="/cerca">
        {" "}
        pagina cerca{" "}
      </Link>
    </div>
  );
};

export default memo(VoidList);
