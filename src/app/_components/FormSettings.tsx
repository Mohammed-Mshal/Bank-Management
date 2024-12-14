'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CustomerInfo, useCustomerInfo } from "../hooks/useCustomerInfo";
import Loading from "../dashboard/loading";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function FormSettings() {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const { userInfo, isLoading, error, getInfoCustomer } = useCustomerInfo();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageProfile: any = useRef();
  const [date, setDate] = useState<Date>();
  const updateProfileHandle = async () => {
    toast.loading("Loading...", {
      position: "bottom-right",
      id: "Loading",
    });

    const profileForm = new FormData();
    imageProfile.current.files[0] &&
      profileForm.append("profile_image", imageProfile.current.files[0]);
    profileForm.append("dateOfBirth", customerInfo?.dateOfBirth as string);
    profileForm.append("phoneNumber", customerInfo?.phoneNumber as string);
    profileForm.append("gender", customerInfo?.gender as string);
    profileForm.append("address", customerInfo?.address as string);
    profileForm.append("firstName", customerInfo?.firstName as string);
    profileForm.append("lastName", customerInfo?.lastName as string);
    profileForm.append("image", customerInfo?.image as string);
    profileForm.append(
      "residentialAddress",
      customerInfo?.residentialAddress as string
    );
    const res = await fetch(`/api/user/edit_profile`, {
      method: "PATCH",
      body: profileForm,
    });
    const data = await res.json();
    toast.remove("Loading");
    if (!res.ok) {
      toast.error(data.message, {
        position: "bottom-right",
        duration: 3000,
      });
      return;
    }
    toast.success(data.message, {
      position: "bottom-right",
      duration: 3000,
    });
    await getInfoCustomer();
  };
  useEffect(() => {
    const getInfo = async () => {
      await getInfoCustomer();
    };
    getInfo();
  }, []);
  useEffect(() => {
    setCustomerInfo({ ...userInfo });
    const dateInfo =
      userInfo.dateOfBirth && new Date(userInfo.dateOfBirth as string);
    dateInfo && setDate(dateInfo);
  }, [userInfo]);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <form className="wrapper_settings mx-auto max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl py-8 px-4 lg:px-8 my-6 shadow-[rgba(255,255,255,.1)] shadow-lg">
      <div className="headerForm flex items-center gap-8 flex-col lg:flex-row">
        {customerInfo?.image && (
          <div className="imageProfile lg:w-[200px] lg:h-[200px] w-[150px] h-[140px] rounded-full overflow-hidden">
            <Image
              alt="User"
              src={customerInfo?.image}
              height={500}
              width={500}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="form-group flex gap-4">
          <label
            htmlFor="imageProfile"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-800 transition-all cursor-pointer px-4 lg:py-4 py-2"
          >
            Upload New Image
          </label>
          <input
            type="file"
            id="imageProfile"
            ref={imageProfile}
            className="hidden"
            onChange={(event) => {
              const reader = new FileReader();
              reader.onload = function (e) {
                customerInfo &&
                  setCustomerInfo({
                    ...customerInfo,
                    image: e.target?.result as string,
                  });
              };
              event.target.files && reader.readAsDataURL(event.target.files[0]);
            }}
          />
          <button
            className="bg-red-700  hover:bg-red-900 transition-all cursor-pointer px-4 lg:py-4 py-2 rounded-lg"
            type="button"
            onClick={() => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  image:
                    "https://ik.imagekit.io/alphaTeam/Bank_Management/default.jpg",
                });
            }}
          >
            Remove Image Profile
          </button>
        </div>
      </div>
      <div className="contentInfo grid grid-cols-2 gap-4 border mt-6 border-white border-opacity-30 p-4 rounded-xl">
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="firstName" className="text-xl">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue={customerInfo?.firstName}
            onChange={(event) => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  firstName: event.target.value,
                });
            }}
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all"
          />
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="lastName" className="text-xl">
            Last Name
          </label>
          <input
            type="text"
            defaultValue={customerInfo?.lastName}
            id="lastName"
            onChange={(event) => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  lastName: event.target.value,
                });
            }}
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all"
          />
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(event) => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  email: event.target.value,
                });
            }}
            defaultValue={customerInfo?.email}
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all"
          />
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="mobileNumber" className="text-xl">
            Mobile Number
          </label>
          <input
            type="tel"
            defaultValue={customerInfo?.phoneNumber}
            id="mobileNumber"
            onChange={(event) => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  phoneNumber: event.target.value,
                });
            }}
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all"
          />
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="email" className="text-xl">
            Gender
          </label>
          <div className="options grid grid-cols-2 gap-4">
            <div className="option flex gap-2 p-2 border rounded-lg border-white border-opacity-30">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={(e) => {
                  customerInfo &&
                    setCustomerInfo({
                      ...customerInfo,
                      gender: e.currentTarget.value,
                    });
                }}
                checked={customerInfo?.gender === "male"}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="option flex gap-2 p-2 border rounded-lg border-white border-opacity-30">
              <input
                type="radio"
                id="female"
                onChange={(e) => {
                  customerInfo &&
                    setCustomerInfo({
                      ...customerInfo,
                      gender: e.currentTarget.value,
                    });
                }}
                value={"female"}
                name="gender"
                checked={customerInfo?.gender === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="id" className="text-xl">
            Id
          </label>
          <input
            type="text"
            defaultValue={customerInfo?.id}
            disabled
            id="id"
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all"
          />
        </div>
        <div className="form-group flex flex-col gap-2 col-span-2 lg:col-span-1">
          <label htmlFor="dateOfBirth" className="text-xl">
            Date Of Birth
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date && date?.toDateString ? (
                  date?.toDateString()
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                captionLayout="dropdown-months"
                mode="single"
                required
                pagedNavigation
                selected={date}
                classNames={{
                  month_caption: "p-2",
                  chevron: "fill-indigo-600",
                  today: "text-indigo-600",
                }}
                onSelect={(dateValue) => {
                  customerInfo &&
                    setCustomerInfo({
                      ...customerInfo,
                      dateOfBirth: dateValue.toDateString(),
                    });
                  setDate(dateValue);
                }}
                showOutsideDays
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="form-group flex flex-col col-span-2 gap-2">
          <label htmlFor="residentialAddress" className="text-xl">
            Residential Address
          </label>
          <textarea
            id="residentialAddress"
            defaultValue={customerInfo?.residentialAddress}
            onChange={(event) => {
              customerInfo &&
                setCustomerInfo({
                  ...customerInfo,
                  residentialAddress: event.target.value,
                });
            }}
            className="rounded-md text-xl outline-none px-2 py-2 focus:shadow-sm focus:shadow-indigo-600 transition-all resize-none h-40"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await updateProfileHandle();
          }}
          className="bg-indigo-600 hover:bg-indigo-800 transition-all cursor-pointer px-4 lg:py-4 py-2 rounded-lg col-span-2 sm:col-span-1"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
