import ProfileMenu from "@/app/_Elements/ProfileMenu";
import ToggleProfileMenu from "@/app/_Elements/ToggleProfileMenu";
import React from "react";
import "./Profile.css";
export default function Profile() {
  return (
    <div className="relative">
      <div className="containerImage cursor-pointer">
        <ToggleProfileMenu />
      </div>
      <ProfileMenu />
    </div>
  );
}
