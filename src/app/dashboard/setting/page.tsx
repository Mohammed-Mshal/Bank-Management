import TitleSection from "@/app/_Elements/TitleSection";
import React from "react";
import FormSettings from "@/app/_components/FormSettings";

export default function Setting() {
  return (
    <div className="flex-1 py-4">
      <div className="headerAccounts flex justify-between items-center">
        <TitleSection markerWord={"Customer"} normalWord="Settings" />
      </div>
      <FormSettings />
    </div>
  );
}
