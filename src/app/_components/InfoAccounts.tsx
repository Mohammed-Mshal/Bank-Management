import React from "react";
import CardInfoAccount from "../_Elements/CardInfoAccount";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
const infoAccount = {
  income: {
    total: 350000,
    prevTotal: 348261,
    typeValue: "SYP",
    link: "/dashboard/income",
  },
  profit: {
    total: 1508.98,
    prevTotal: 15708.98,
    typeValue: "SYP",
    link: "/dashboard/profit",
  },
  reversed: {
    total: 7415.644,
    prevTotal: 7415.644,
    typeValue: "",
    link: "/dashboard/reversed",
  },
  conversion: {
    total: 10.78,
    prevTotal: 10.78,
    typeValue: "%",
    link: "/dashboard/conversion",
  },
};
export default function InfoAccounts() {
  return (
    <ul className="container_info flex flex-wrap justify-between md:gap-4 gap-2">
      {Object.keys(infoAccount).map((info) => {
        return (
          <CardInfoAccount
            key={info}
            iconCard={<RiMoneyDollarBoxLine />}
            titleInfo={info}
            typeValue={infoAccount[info].typeValue}
            valueInfo={infoAccount[info].total}
            preValue={infoAccount[info].prevTotal}
            link={infoAccount[info].link}
          />
        );
      })}
    </ul>
  );
}
