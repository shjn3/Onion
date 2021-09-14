import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import FormLogin from "../components/form/formAuth/FormLogin.js";
import FormRegister from "../components/form/formAuth/FormRegister.js";
const PageLogin = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  });

  return (
    <div className="auth__container">
      <div className="body_login"></div>
      <div className="grad"></div>
      <div className="header">
        <div>
          Hành<span>Tây</span>
        </div>
      </div>
      <br />
      <div className="form__container">
        <Switch>
          {login_page.map((item) => (
            <Route key={item.id} path={item.path}>
              <item.component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default PageLogin;

const login_page = [
  {
    id: 1,
    path: "/login",
    component: FormLogin,
  },
  {
    id: 2,
    path: "/register",
    component: FormRegister,
  },
];
