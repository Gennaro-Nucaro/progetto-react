import React, { useState, useEffect, Fragment } from "react";
import css from "./style.module.css";
import { isLoggedIn } from "@utils/auth";
import ScrollToTop from "@utils/ScrollTop";
//LIBS
import { Link, Redirect } from "react-router-dom";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { userState, clearStateUser } from "@redux-slices/user";
import { loginUser } from "@redux-asyncActions";


const Login: React.VFC = () => {
  const dispatch = useAppDispatch();
  const { loading, isSuccess, message, username } = useAppSelector(userState);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //USE EFFECT
  useEffect(() => {
    dispatch(clearStateUser());
  }, [dispatch, isSuccess]);

  return (
    <Fragment>
      <ScrollToTop />
      {isLoggedIn() && username ? (
        <Redirect to="/" />
      ) : (
        <div className={css.page}>
          <div className={css.title}>Login</div>
          <div className={css.container}>
            <div className={css.message}>
              <h3>{message}</h3>
            </div>
            <form onSubmit={login}>
              <div className={css.formElement}>
                <p>Username</p>
                <input
                  required
                  onChange={handlerInput}
                  name="username"
                  value={user.username}
                  type="text"
                />
              </div>
              <div className={css.formElement}>
                <p>Password</p>
                <input
                  required
                  onChange={handlerInput}
                  value={user.password}
                  name="password"
                  type="password"
                />
              </div>
              <button disabled={loading} className={css.btn} type="submit">
                Login
              </button>
            </form>
            <Link
              onClick={() => {
                dispatch(clearStateUser());
              }}
              to="/registrati"
            >
              <p className={css.info}>Non hai un account? registrati qui</p>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
