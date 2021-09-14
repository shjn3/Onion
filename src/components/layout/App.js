import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PageHome from "../../pages/PageHome.js";
import PageLogin from "../../pages/PageLogin";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../../store/actions/account.js";

const App = () => {
  const dispatch = useDispatch();
  const { authLoading, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAccessToken());
  }, [dispatch]);
  let body;

  if (0) {
    body = (
      <>
        <div style={{ height: "100vh" }}>
          <div className="row position-relative h-100">
            <div className="spin">
              <div className="spin__container">
                <div className="spin__circle"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    body = (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/buy" />} />

          <Route
            exact
            path={["/login", "/register"]}
            render={(props) => <PrivateLoginRoute {...props} isAuth={isAuth} />}
          />

          <Route
            exact
            path={[
              "/sale",
              "/buy",
              "/buyDetail/:id",
              "/driver",
              "/driverDetail/:id",
            ]}
            render={(props) => <PrivateRoute {...props} isAuth={isAuth} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    );
  }

  return <>{body}</>;
};

export default App;

const PrivateRoute = ({ isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth ? <PageHome /> : <Redirect to="/login" />)}
  />
);
const PrivateLoginRoute = ({ isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth ? (
        // true
        <PageLogin />
      ) : (
        <Redirect to="/buy" />
      )
    }
  />
);
