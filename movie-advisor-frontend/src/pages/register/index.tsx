import React, { useState, useEffect, Fragment } from "react";
import css from "./style.module.css";
import { isLoggedIn } from "@utils/auth";
import ScrollToTop from "@utils/ScrollTop";
//LIB
import { Link, Redirect } from "react-router-dom";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { userState, clearStateUser } from "@redux-slices/user";
import { registerUser } from "@redux-asyncActions";

const Register: React.VFC = () => {
  const [user, setUser] = useState({
    username: "",
    // email: "",
    password: "",
  });
  const { loading, message, username } = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(clearStateUser());
  }, [dispatch]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <Fragment>
      <ScrollToTop/>
      {isLoggedIn() && username ? (
        <Redirect to="/user-homepage" />
      ) : (
        <div className={css.page}>
          <div className={css.title}>Crea Nuovo Account</div>
          <div className={css.container}>
            <div className={css.message}>
              <h3>{message}</h3>
            </div>
            <form onSubmit={submit}>
              <div className={css.formElement}>
                <p>Username</p>
                <input
                  name="username"
                  required
                  minLength={4}
                  maxLength={20}
                  onChange={handlerInput}
                  value={user.username}
                  type="text"
                />
              </div>
              {/* <div className={css.formElement}>
                <p>Email</p>
                <input
                  name="email"
                  required
                  pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                  minLength={3}
                  maxLength={30}
                  onChange={handlerInput}
                  value={user.email}
                  type="email"
                />
              </div> */}
              <div className={css.formElement}>
                <p>Password</p>
                <input
                  name="password"
                  required
                  minLength={6}
                  maxLength={20}
                  onChange={handlerInput}
                  value={user.password}
                  type="password"
                />
              </div>
              <button disabled={loading} className={css.btn} type="submit">
                Registrati
              </button>
            </form>
            <Link onClick={() => dispatch(clearStateUser())} to="/login">
              <p className={css.info}>Vai alla Pagina Login</p>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Register;
