"use client";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

export default function DateFilter() {
  const [value, setValue] = useState<{
    startDate: DateValueType | null;
    endDate: DateValueType | null;
  }>({
    startDate: null,
    endDate: null,
  });
  return (
    <div className="flex containerDate h-10">
      <Datepicker
        classNames={{
          toggleButton() {
            return "absolute right-2 top-1/2 -translate-y-1/2 text-white";
          },
          input: () => {
            return "border-none outline-none w-full h-full bg-white bg-opacity-5 backdrop-blur-lg py-2 px-3 cursor-pointer rounded-lg text-white placeholder:text-white placeholder:text-opacity-50 h-full";
          },
        }}
        primaryColor={"indigo"}
        useRange={false}
        placeholder="Filter By Date"
        value={value as DateValueType}
        onChange={(newValue: DateValueType) =>
          setValue({
            startDate: newValue?.startDate as DateValueType,
            endDate: newValue?.endDate as DateValueType,
          })
        }
      />
    </div>
  );
}
