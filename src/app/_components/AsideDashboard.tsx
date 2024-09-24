"use client";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { BsClock } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
const listItemContent = [
  {
    titleLink: "Overview",
    link: "/overview",
    icon: <BsClock />,
  },
  {
    titleLink: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    titleLink: "Setting",
    link: "/setting",
    icon: <FiSettings />,
  },
];
export default function AsideDashboard() {
  const pathName = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <aside
      className={`sticky top-0  min-h-screen ${
        toggleMenu ? "max-w-24" : "max-w-64"
      } px-2 py-4 flex transition-all duration-500 overflow-hidden`}
    >
      <div className="containerAside px-3 py-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl flex-1">
        <div
          className={`headerAside flex items-center justify-between text-white text-opacity-85`}
        >
          <h2
            className={`title_site text-3xl transition-all duration-500 text-nowrap overflow-hidden ${
              toggleMenu ? "w-0 opacity-0" : "w-fit opacity-100"
            } `}
          >
            Golden Bank
          </h2>
          <div
            className={`toggle_aside  ${
              toggleMenu ? "flex-1 flex justify-center" : "flex-initial"
            }`}
          >
            <button
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
              className="btn_toggle text-xl flex items-center outline-none"
              title="toggle"
            >
              <CiMenuFries />
            </button>
          </div>
        </div>
        <ul className="listItem text-xl my-8 text-white flex flex-col gap-4">
          {listItemContent.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center gap-2 ${
                    pathName === item.link && "bg-indigo-800"
                  }  rounded-xl py-3 px-4 transition-all duration-500 hover:bg-indigo-800`}
                >
                  <span
                    className={` ${toggleMenu ? "mx-auto" : "flex-initial"} `}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`transition-all duration-500  text-nowrap overflow-hidden ${
                      toggleMenu ? "w-0 opacity-0 absolute" : "w-fit opacity-100 static"
                    }`}
                  >
                    {item.titleLink}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>{" "}
      </div>
    </aside>
  );
}
