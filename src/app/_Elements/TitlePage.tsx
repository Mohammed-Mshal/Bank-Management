"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function TitlePage() {
  const currentPath = usePathname();
  return (
    <h1 className={`text-white text-3xl`}>
      {currentPath.split("/")[currentPath.split("/").length - 1].toUpperCase()}
    </h1>
  );
}
