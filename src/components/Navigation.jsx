/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ activePage = 0 }) => {
  const menus = [
    {
      name: "Home",
      icon: "home-outline",
      link: "/",
      active: "active__link"
    },
    {
      name: "Like",
      icon: "heart-outline",
      link: "/like",
      active: "active__link"
    },
    {
      name: "Save",
      icon: "bookmark-outline",
      link: "/bookmark",
      active: "active__link"
    },
    {
      name: "Profile",
      icon: "person-outline",
      link: "/profile",
      active: "active__link"
    },
  ];

  const [active, setActive] = useState(activePage);
  return (
      <nav className="nav container">
        <div className="nav__menu">
          <ul className="nav__list">
            {menus.map((menu, i) => (
              <li key={menu.name} className={"nav__item"} onClick={() => setActive(i)}>
                <Link to={menu.link} id={menu.name} className={`nav__link ${active === i ? menu.active : ""}`}>
                  <ion-icon name={menu.icon}></ion-icon>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
  );
};
