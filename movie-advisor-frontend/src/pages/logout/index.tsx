import React, { Fragment, useEffect } from "react";
import css from "./style.module.css";
import { logout, isLoggedIn } from "@utils/auth";
//LIB
import { Redirect } from "react-router-dom";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { usermameSelector, clearUser } from "@redux-slices/user";

const Logout: React.VFC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(usermameSelector);

  useEffect(() => {
    if (isLoggedIn()) {
      logout();
      dispatch(clearUser());
    }
  }, [dispatch]);
  return (
    <Fragment>
      {isLoggedIn() && userName ? (
        <div className={css.page}>
          <h1>logout...</h1>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
};

export default Logout;
