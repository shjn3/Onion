import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
  const [toggle, setToggle] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  return (
    <>
      <div
        className={toggle ? "sidebar hide" : "sidebar "}
        data-color="purple"
        data-background-color="white"
        data-image="https://i.pinimg.com/550x/a2/f5/e8/a2f5e83890b743387e136af107bf751a.jpg"
      >
        <div className="logo" onClick={() => setToggle((pre) => !pre)}>
          <span className="simple-text logo-normal fw-bold">
            Hành <span>Tây</span>
          </span>
        </div>
        <div
          className={
            toggle ? "sidebar-wrapper hide_wrapper" : "sidebar-wrapper "
          }
        >
          <ul className="nav">
            {sideBar.map((item) => (
              <Link key={item.id} to={item.link}>
                <li
                  className={`nav-item ${
                    item.url.find(
                      (it) => it === location.pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="nav-link">
                    <i className="material-icons">{item.icon}</i>
                    <p>{item.title}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default SideBar;
const sideBar = [
  {
    id: 1,
    title: "Thu Mua",
    icon: "dashboard",
    link: "/buy",
    url: ["buy", "buyCustomer", "buyCustomerDetail", "buyDetail"],
  },
  {
    id: 3,
    title: "Tài xế",
    icon: "drive_eta",
    link: "/driver",
    url: ["driver", "driverDetail"],
  },
];

/*{
    id: 2,
    title: "Bán Hàng",
    icon: "person",
    link: "/sale",
    url: ["sale"],
  }, */
