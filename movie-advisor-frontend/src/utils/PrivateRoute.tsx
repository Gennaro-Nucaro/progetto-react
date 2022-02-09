import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "./auth";
import { usermameSelector } from "../redux/slice/user";
import { useAppSelector } from "@redux-hooks";

interface PrivateRouteProps {
  component: React.ElementType;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  path,
  exact,
}) => {
  const username = useAppSelector(usermameSelector);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isLoggedIn() && username ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
