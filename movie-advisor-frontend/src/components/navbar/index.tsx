import React from "react";
import css from "./style.module.css";
import { isLoggedIn } from "@utils/auth";
//LIB
import { Link, NavLink } from "react-router-dom";
//ICONS
import { FaUserCircle } from "react-icons/fa";
//COMP ESTER
import Popover from "@components/popover";
//REDUX
import { useAppSelector } from "@redux-hooks";
import { usermameSelector } from "@redux-slices/user";

const stylePopover = {
  left: "-35px",
  top: "30px",
};
const stylePopoverUser = {
  left: "-31px",
  top: "30px",
};
const Header: React.VFC = () => {
  const userName = useAppSelector(usermameSelector);

  return (
    <div className={css.navbar}>
      <div className={css.logo}>
        <Link to="/">
          <h6>Movie-Advisor</h6>
        </Link>
      </div>
      <div>
        <ul className={css.menu}>
          <li>
            <NavLink exact activeClassName={css.active} to="/cerca">
              CERCA
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={css.active} exact to="/">
              ESPLORA
            </NavLink>
          </li>
          {isLoggedIn() && userName ? (
            <li>
              <NavLink activeClassName={css.active} to="/statistiche">
                STATISTICHE
              </NavLink>
            </li>
          ) : (
            <li>
              <Popover
                style={{
                  left: "-45px",
                  top: "25px",
                }}
                list={["Registrati per vedere questa pagina"]}
              >
                <NavLink activeClassName={css.active} to="/login">
                  STATISTICHE
                </NavLink>
              </Popover>
            </li>
          )}
        </ul>
      </div>
      <div>
        <ul className={css.iconsGroup}>
          <li>
            {isLoggedIn() && userName ? (
              <Popover
                style={stylePopoverUser}
                linkList={["Preferiti", "Watchlist", "Account", "Logout"]}
              >
                <FaUserCircle />
              </Popover>
            ) : (
              <Popover style={stylePopover} linkList={["Login", "Registrati"]}>
                <FaUserCircle />
              </Popover>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
