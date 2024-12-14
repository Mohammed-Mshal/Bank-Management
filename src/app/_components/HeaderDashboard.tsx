import React from "react";
import ListTabs from "../_Elements/ListTabs";
import FilterSelect from "../_Elements/FilterSelect";

export default function HeaderDashboard() {
  return (
    <div className="border-b-2 border-white border-opacity-20 flex justify-between md:flex-row flex-col-reverse">
      <div className="containerListTabs">
        <ListTabs />
      </div>
    </div>
  );
}
