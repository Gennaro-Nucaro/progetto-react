import { useEffect } from "react";
//REDUX
import { useAppSelector, useAppDispatch } from "@redux-hooks";
import { usermameSelector } from "@redux-slices/user";
import {
  checkUser,
  getStats,
  getBanlist,
  getPreferiti,
  getWatchlist,
  getProvider,
  getGeneri,
} from "@redux-asyncActions";

const StartApp  = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(usermameSelector);

  useEffect(() => {
    dispatch(getGeneri());
    dispatch(getProvider());
    if (localStorage.getItem("token")) {
      dispatch(checkUser());
    }
  }, [dispatch]);

  // LOGIN SUCCESS
  useEffect(() => {
    if (username) {
      dispatch(getWatchlist());
      dispatch(getPreferiti());
      dispatch(getBanlist());
      dispatch(getStats());
    }
  }, [username, dispatch]);

  return {};
};

export default StartApp;
