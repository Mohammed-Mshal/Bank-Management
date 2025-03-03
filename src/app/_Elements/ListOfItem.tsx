"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdDashboard, MdManageAccounts, MdNotifications, MdReceipt} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useStore } from "../hooks/useStore";

const listItemContent = [
  {
    titleLink: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    titleLink: "Accounts",
    link: "/dashboard/accounts",
    icon: <MdManageAccounts />,
  },
  {
    titleLink: "Setting",
    link: "/dashboard/setting",
    icon: <FiSettings />,
  },
  {
    titleLink: "Notifications",
    link: "/dashboard/notifications",
    icon: <MdNotifications />,
  },
  {
    titleLink: "Notifications",
    link: "/dashboard/transfer-center",
    icon: <FaMoneyBillTransfer />,
  },
  {
    titleLink: "Transactions",
    link: "/dashboard/transactions",
    icon: <MdReceipt />,
  },
];
export default function ListOfItem() {
  const pathName = usePathname();
  const { collapseAside } = useStore()
  return (
    <ul className="listItem text-xl mt-4 lg:mt-8 mb-8 text-white flex flex-col gap-4">
      {listItemContent.map((item, index) => {
        return (
          <li key={index}>
            <Link
              href={item.link}
              onClick={() => {
                collapseAside()
              }}
              className={`flex items-center gap-2 ${pathName === item.link && "bg-indigo-800"
                }  rounded-xl py-3 px-4 transition-all duration-500 hover:bg-indigo-800`}
            >
              <span className={`iconItem`}>{item.icon}</span>
              <span
                className={`transition-all duration-500 text-nowrap overflow-hidden titleLink`}
              >
                {item.titleLink}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
