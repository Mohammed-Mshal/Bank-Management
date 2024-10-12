"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

export default function FilterSelect() {
  return (
    <div className="flex h-10 ">
      <Select
        size="md"
        fullWidth
        radius="sm"
        aria-label="Filter By"
        placeholder="Filter By"
        className="text-white outline-none bottom-none w-52 placeholder:text-white "
        classNames={{
          base:'flex-1 max-w-full',
          innerWrapper:'min-h-fit h-fit',
          trigger: "bg-white bg-opacity-5 backdrop-blur-lg [data-hover='true']:bg-white" ,
        }}
        
      >
        <SelectItem key={"date"} className="text-white leading-6">
          By Date
        </SelectItem>
      </Select>
    </div>
  );
}
