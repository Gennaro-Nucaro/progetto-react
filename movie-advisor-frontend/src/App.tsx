import { Fragment } from "react";
//LIB
import { HashRouter as Router, Switch, Route } from "react-router-dom";
//PAGES
import Header from "./components/navbar";
import Footer from "./components/footer";
import Esplora from "./pages/esplora";
import ErrorPage from "./pages/errorPage";
import InfoFilm from "./pages/info-film";
import InfoPerson from "./pages/info-person";
import Login from "./pages/login";
import Register from "./pages/register";
import Account from "./pages/account";
import WatchList from "./pages/watchlist";
import Logout from "./pages/logout";
import Preferiti from "./pages/preferiti";
import Statistiche from "./pages/statistiche";
import Cerca from "./pages/cerca";
import NoMobile from "@components/NoMobile";
//HOOKS
import StartApp from "@hooks/StartApp";
import ErrorApp from "@hooks/ErrorApp";
//UTILS
import PrivateRoute from "@utils/PrivateRoute";
import WindowSize from "@utils/WindowSize";

function App() {
  StartApp();
  const size = WindowSize();
  const { isError } = ErrorApp();

  return (
    <Router basename="/">
      {size.width < 850 ? (
        <NoMobile />
      ) : (
        <Fragment>
          <Header />
          <Switch>
            {isError ? (
              <ErrorPage />
            ) : (
              <Fragment>
                {/*PUBLIC USER ROUTE */}
                <Route exact path="/">
                  <Esplora />
                </Route>
                <Route exact path="/cerca">
                  <Cerca />
                </Route>
                <Route exact path="/info/:id">
                  <InfoFilm />
                </Route>
                <Route exact path="/person/:id">
                  <InfoPerson />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/registrati">
                  <Register />
                </Route>
                <Route exact path="/logout">
                  <Logout />
                </Route>
                {/* PRIVATE USER ROUTE */}
                <PrivateRoute
                  exact={true}
                  path="/watchlist"
                  component={WatchList}
                />
                <PrivateRoute
                  exact={true}
                  path="/preferiti"
                  component={Preferiti}
                />
                <PrivateRoute
                  exact={true}
                  path="/account"
                  component={Account}
                />
                <PrivateRoute
                  exact={true}
                  path="/statistiche"
                  component={Statistiche}
                />
              </Fragment>
            )}
          </Switch>
          <Footer />
        </Fragment>
      )}
    </Router>
  );
}

export default App;
