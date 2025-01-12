'use client'
import LoadingData from '@/app/_components/loadingData'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useTransactions } from '@/app/hooks/useTransactions'
import { Transaction } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './Transactions.css'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Transactions() {

  const [sortedDataAs, setSortedDataAs] = useState('desc');
  const [sortedDataBy, setSortedDataBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date(Date.now()).toDateString()),
    to: new Date(new Date(Date.now()).toDateString()),
  })
  const { isLoading, error, getTransactions, listTransactions, totalPages } = useTransactions()
  useEffect(() => {
    getTransactions(10, currentPage, null, sortedDataAs, sortedDataBy, date.from?.toString(), date.to?.toString())
  }, [])
  return (
    <div className="transactions">
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
            <label htmlFor="sorted" className='lg:text-xl md:text-lg text-medium flex-1 max-w-32 md:max-w-fit'>Sort By</label>
            <Select onValueChange={(value) => {
              setSortedDataBy(value)
            }}>
              <SelectTrigger id='sorted' className='flex-1 min-w-[250px] max-w-[350px]'>
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>
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
          <Button className='flex items-center justify-center gap-2 bg-indigo-600  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-indigo-800 text-white max-w-32 w-full mx-auto sm:mx-0'
            onClick={() => {
              getTransactions(10, currentPage, null, sortedDataAs, sortedDataBy, date.from?.toString(), date.to?.toString())
            }}>
            Filter
          </Button>
        </div>
      </div>
      <div className="transaction flex flex-1 bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl border my-4 overflow-hidden">
        <div className="container max-w-full">
          {isLoading ? <LoadingData /> :
            error ? <h4 className="text-center text-xl text-red-600 font-bold">{error}</h4> :
              <Table>
                <Thead>
                  <Tr>
                    <Th className="text-start p-4">Account Id</Th>
                    <Th className="text-start p-4">Receiver Account Id</Th>
                    <Th className="text-start p-4">Amount</Th>
                    <Th className="text-start p-4">Description</Th>
                    <Th className="text-start p-4">Transaction Date</Th>
                    <Th className="text-start p-4"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listTransactions.map((transaction: Transaction) => (
                    <Tr key={transaction.id}>
                      <Td className="p-4">{transaction?.accountId}</Td>
                      <Td className="p-4">{transaction?.idReceiverAccount}</Td>
                      <Td className="p-4">{transaction?.amount}</Td>
                      <Td className="p-4">{transaction?.description}</Td>
                      <Td className="p-4">{(new Date(transaction?.transactionDate)).toDateString()}</Td>
                      <Td className="p-4">
                        <Button className='bg-red-600 hover:bg-red-700 text-white'>Delete</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
          }
        </div>

      </div>
      <div className="flex justify-center gap-8">
        {currentPage - 1 > 0 && (
          <button
            className="flex items-center justify-center gap-2 bg-white bg-opacity-50  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-white hover:bg-opacity-20 w-40"
            onClick={() => {
              setCurrentPage((pre) => pre - 1);
              getTransactions(10, currentPage - 1, null, sortedDataAs, sortedDataBy, date.from?.toString(), date.to?.toString());
            }}
          >
            Previews
          </button>
        )}
        {totalPages > currentPage && (
          <button
            className="flex items-center justify-center gap-2 bg-indigo-600  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-indigo-800 w-40"
            onClick={() => {
              setCurrentPage((pre) => pre + 1);
              getTransactions(10, currentPage + 1, null, sortedDataAs, sortedDataBy, date.from?.toString(), date.to?.toString());
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}


