import React, { memo } from "react";
import css from "./style.module.css";
import cn from "classnames";
import WindowSize from "@utils/WindowSize"

const NoMobile: React.VFC = () => {
  const size = WindowSize()
  return (
    <div className={cn("bodyComponentNoMobile", css.comp)}>
      <h1>Coming soon...</h1>
      <h2>
        Spiacenti per momento Movie-Advisor è disponibile solo per schermi con
        larghezza superiore a 850px
      </h2>
      <h2>La tua larghezza attuale è: {size.width}px</h2>
    </div>
  );
};

export default memo(NoMobile);
