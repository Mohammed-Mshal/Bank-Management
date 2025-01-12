'use client'
import React, { useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import LoadingData from "../loadingData";
import { Transaction } from "@prisma/client";
import Link from "next/link";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './Transactions.css'
export default function Transactions() {
  const { isLoading, error, getTransactions, listTransactions } = useTransactions()
  useEffect(() => {
    getTransactions(10, 1, null, null, null, null, null)
  }, [])
  return (
    <div className="transaction flex flex-1 bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl border">
      <div className="container max-w-full p-4">
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
                </Tr>
              </Thead>
              <Tbody>
                {listTransactions.map((transaction: Transaction) => (
                  <Tr key={transaction.id}>
                    <Td className="px-4 py-2">{transaction?.accountId}</Td>
                    <Td className="px-4 py-2">{transaction?.idReceiverAccount}</Td>
                    <Td className="px-4 py-2">{transaction?.amount}</Td>
                    <Td className="px-4 py-2">{transaction?.description}</Td>
                    <Td className="px-4 py-2">{(new Date(transaction?.transactionDate)).toUTCString()}</Td>
                  </Tr>
                ))}
              </Tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="pt-4 text-center">
                    A list of Your Transactions. <Link href={'/dashboard/transactions'} className="hover:text-white underline transition-all">See All Transactions</Link>
                  </td>
                </tr>
              </tfoot>
            </Table>
        }
      </div>
    </div>
  );
}
