"use client";
import LoadingData from "@/app/_components/loadingData";
import NotificationItem from "@/app/_components/NotificationItem";
import { useNotification } from "@/app/hooks/useNotification";
import React, { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedDataAs, setSortedDataAs] = useState('desc');
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date(Date.now()).toDateString()),
    to: new Date(new Date(Date.now()).toDateString()),
  })
  const funControlCurrentPage = () => {
    getNotification(10, currentPage, null, sortedDataAs, date.from?.toString(), date.to?.toString());
  };
  const { isLoading, error, listNotification, getNotification, totalPages } =
    useNotification();
  useEffect(() => {
    getNotification(10, currentPage, null, sortedDataAs, null, null)
  }, [])
  return (
    <div className="notification">
      <div className="filtering bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl border my-4 p-4 gap-8 flex flex-col xl:flex-row xl:items-baseline items-stretch flex-wrap justify-between">
        <h2 className='lg:text-xl text-lg font-bold'>
          Filter:
        </h2>
        <div className="form-filter flex xl:justify-end justify-center flex-wrap flex-col sm:flex-row flex-1 text-nowrap gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="dateOfBirth" className='lg:text-xl md:text-lg text-medium flex-1 max-w-32 md:max-w-fit'>
              Date Of Birth
            </label>
            <div className={cn("grid flex-1 min-w-[250px] max-w-[350px] gap-2", '')}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    name="Pick A Date"
                    id="date"
                    variant={"outline"}

                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DayPicker
                    captionLayout="dropdown"
                    mode="range"
                    required
                    pagedNavigation
                    selected={date}
                    classNames={{
                      month_caption: "p-2",
                      chevron: "fill-indigo-600",
                      today: "text-indigo-600",
                      range_middle: 'fill-indigo-600',
                      range_start: 'bg-indigo-600 rounded-bl-full rounded-tl-full',
                      range_end: 'bg-indigo-600 rounded-tr-full rounded-br-full text-white',
                    }}
                    onSelect={setDate}
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="sorted" className='lg:text-xl md:text-lg text-medium flex-1 max-w-32 md:max-w-fit'>Sort From</label>
            <Select onValueChange={(value) => {
              setSortedDataAs(value)
            }}>
              <SelectTrigger id='sorted' className='flex-1 min-w-[250px] max-w-[350px]'>
                <SelectValue placeholder="A To Z" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">A To Z</SelectItem>
                <SelectItem value="asc">Z To A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button name="Filter" className='flex items-center justify-center gap-2 bg-indigo-600  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-indigo-800 text-white max-w-32 w-full mx-auto sm:mx-0'
            onClick={() => {
              getNotification(10, currentPage, null, sortedDataAs, date.from?.toString(), date.to?.toString())
            }}>
            Filter
          </Button>
        </div>
      </div>

      <div className="wrapper-notifications mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl py-8 px-4 lg:px-8 my-6 shadow-[rgba(255,255,255,.1)] shadow-lg">
        <div className="container-notifications flex flex-col items-center gap-8">
          {listNotification.length === 0 ? <h2>You Don`t Have Notifications</h2> : listNotification.map((notification, index) => {
            return (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                indexItem={index}
                textMessage={notification.textMessage}
                titleMessage={notification.titleMessage}
                totalList={listNotification.length}
                createdAt={notification.createdAt}
                funControlCurrentPage={funControlCurrentPage}
              />
            );
          })}
          {error && (
            <h2 className="text-center px-4 text-xl text-red-600">{error}</h2>
          )}
          {isLoading && <LoadingData />}
        </div>
        <div className="flex justify-center flex-wrap gap-8">
          {currentPage - 1 > 0 && (
            <button
              name="Previews"
              className="flex items-center justify-center gap-2 bg-black bg-opacity-70  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-black hover:bg-opacity-40 w-40"
              onClick={() => {
                setCurrentPage((pre) => pre - 1);
                getNotification(10, currentPage - 1, null, sortedDataAs, date.from?.toString(), date.to?.toString());
              }}
            >
              Previews
            </button>
          )}
          {totalPages > currentPage && (
            <button name="Next"
              className="flex items-center justify-center gap-2 bg-indigo-600  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-indigo-800 w-40"
              onClick={() => {
                setCurrentPage((pre) => pre + 1);
                getNotification(10, currentPage + 1, null, sortedDataAs, date.from?.toString(), date.to?.toString());
              }}
            >
              Next
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
