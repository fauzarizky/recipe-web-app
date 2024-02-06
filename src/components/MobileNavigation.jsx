/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export const MobileNavigation = ({ activePage = 0 }) => {
  const menus = [
    {
      name: "Home",
      icon: "home-outline",
      dis: "translate-x-0",
      link: "/",
    },
    {
      name: "Like",
      icon: "heart-outline",
      dis: "translate-x-16",
      link: "/like",
    },
    {
      name: "Save",
      icon: "bookmark-outline",
      dis: "translate-x-32",
      link: "/bookmark",
    },
    {
      name: "Profile",
      icon: "person-outline",
      dis: "translate-x-48",
      link: "/profile",
    },
  ];

  const [active, setActive] = useState(activePage);

  return (
    <div className="bg-white max-h-[4.4rem] w-full sm:w-1/3 px-6 rounded-t-xl fixed bottom-0 ">
      <ul className="flex relative">
        <span className={`bg-[#44995F] ${menus[active]?.dis} duration-500 border-4 border-[#F7F7F7] h-16 w-16 absolute -top-5 rounded-full`}></span>
        {menus.map((menu, i) => (
          <li key={i} className="w-16">
            <Link to={menu.link}>
              <a className="flex flex-col text-center pt-6" onClick={() => setActive(i)}>
                <span className={`text-xl cursor-pointer ${i === active && "-mt-6 text-[#F7F7F7]"} duration-500 text-[#44995F]`}>
                  <ion-icon name={menu.icon}></ion-icon>
                </span>
                <span className={`${active === i ? "translate-y-4 duration-700 opacity-100" : "translate-y-10"} text-[#44995F]`}>{menu.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
