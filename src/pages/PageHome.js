import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import SideBar from "../components/layout/SideBar.js";
import { BuyOnion } from "../components/buy/BuyComponent";
import { SaleOnion } from "../components/sale/SaleComponent.js";
import BuyDetailComponent from "../components/buy/BuyDetailComponent.jsx";
import DriverComponent from "../components/driver/DriverComponent.js";
import DriverDetailComponent from "../components/driver/DriverDetailComponent.js";
import { Header } from "../components/layout/Header.js";

const PageHome = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <main className={toggle ? "main_wapper active" : "main_wapper"}>
        <SideBar toggle={toggle} setToggle={setToggle} />
        <div className="main_container">
          <Header />
          <div className={`main_content`}>
            <Switch>
              {main_page.map((item) => (
                <Route key={item.id} path={item.path}>
                  <item.component />
                </Route>
              ))}
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageHome;

const main_page = [
  {
    id: 1,
    path: "/buy",
    component: BuyOnion,
  },
  {
    id: 2,
    path: "/sale",
    component: SaleOnion,
  },
  {
    id: 3,
    path: "/buyDetail/:id",
    component: BuyDetailComponent,
  },
  {
    id: 4,
    path: "/driver",
    component: DriverComponent,
  },
  {
    id: 5,
    path: "/driverDetail/:id",
    component: DriverDetailComponent,
  },
];
