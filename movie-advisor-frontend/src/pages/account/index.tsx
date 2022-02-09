import React, { useEffect } from "react";
import css from "./style.module.css";
//LIB
import { useHistory } from "react-router-dom";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { userState, clearStateUser } from "@redux-slices/user";
import { deleteUser } from "@redux-asyncActions";
//UTILS
import ScrollToTop from "@utils/ScrollTop";

const Account: React.VFC = () => {
  const { username, loading, isSuccess } = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      history.push("/logout");
      dispatch(clearStateUser());
    }
  }, [isSuccess, dispatch, history]);

  return (
    <div className={css.page}>
      <ScrollToTop />
      <div className={css.container}>
        <div className={css.info}>
          <h1 className={css.title}>
            Ciao <span>{username}</span>
          </h1>
        </div>

        <div className={css.actions}>
          <button
            disabled={loading}
            onClick={() => {
              dispatch(deleteUser());
            }}
            className={css.btn}
          >
            Elimina Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
