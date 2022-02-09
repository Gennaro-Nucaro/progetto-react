import React, { Fragment } from "react";
import css from "./style.module.css";
import { ImSpinner2 } from "react-icons/im";
import cn from "classnames";

interface loadingProps {
  size?: number;
  color?: string;
}

export const Spinner: React.VFC<loadingProps> = ({
  size = 30,
  color = "white",
}) => {
  return (
    <Fragment>
      <ImSpinner2
        style={{ fontSize: size, color: color }}
        className={cn(css.icon, css.rotate, css.linear, css.infinite)}
      />
    </Fragment>
  );
};
