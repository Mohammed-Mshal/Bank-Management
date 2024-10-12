"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const listTabs = [
  {
    title: "Overview",
    link: "/dashboard",
  },
  {
    title: "Notification",
    link: "/dashboard/notification",
  },
  {
    title: "History",
    link: "/dashboard/history",
  },
];

export default function ListTabs() {
  const currentPathname = usePathname();
  return (
    <ul className="listTabs flex ">
      {listTabs.map((tab, index) => {
        return (
          <li key={index} className="flex">
            <Link
              href={tab.link}
              className={`${
                tab.link === currentPathname
                  ? "text-opacity-100  border-b-indigo-800"
                  : "text-opacity-50"
              } text-white p-3 text-xl border-b-2 border-transparent hover:text-opacity-100 hover:border-b-2 hover:border-b-indigo-800 transition-all duration-500`}
            >
              {tab.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
