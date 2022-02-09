import React, { useState, memo } from "react";
import css from "./style.module.css";
//LIB
import { Link } from "react-router-dom";

interface PopoverProps {
  children: React.ReactElement;
  list?: string[] | null;
  linkList?: string[] | null;
  style?: {} /*style for position absolute element*/;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  list = null,
  linkList = null,
  style,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={css.popover}
    >
      {/* children*/}
      <div className={css.children}>{children}</div>
      {/* popover */}
      {open && (
        <div style={style} className={css.paper}>
          {linkList && (
            <ul className={css.Linklist}>
              {linkList.map((ele) => (
                <li key={ele}>
                  <Link to={`/${ele}`}>{ele}</Link>
                </li>
              ))}
            </ul>
          )}
          {list && (
            <ul className={css.list}>
              {list.map((ele) => (
                <li key={ele}>{ele}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Popover);
