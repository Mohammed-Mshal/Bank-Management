"use client";
import React from "react";
import { useAppSelector } from "../libs/hooks";
import Image from "next/image";

export default function ImageProfile() {
  const customer = useAppSelector((state) => state.customer);
  console.log(customer);

  return (
    <Image
      src={customer?.image || "/static/images/profileImage2.jpg"}
      height={40}
      width={40}
      alt="Profile"
      className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover"
    />
  );
}
