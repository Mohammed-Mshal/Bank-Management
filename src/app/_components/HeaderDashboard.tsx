import React from "react";
import ListTabs from "../_Elements/ListTabs";
import FilterSelect from "../_Elements/FilterSelect";

export default function HeaderDashboard() {
  return (
    <div className="border-b-2 border-white border-opacity-20 flex justify-between md:flex-row flex-col-reverse">
      <div className="containerListTabs">
        <ListTabs />
      </div>
      <div className="containerFiltering flex flex-col sm:flex-row sm:items-center items-stretch gap-4 flex-1 justify-center md:justify-end  my-4 md:my-0">
        <FilterSelect />
      </div>
    </div>
  );
}
