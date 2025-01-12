import React from "react";
import InfoAccounts from "../_components/InfoAccounts";
import Transactions from "../_components/Transactions/Transactions";
export default async function DashboardPage() {
  return (
    <div className="main_dashboard py-4 md:pe-2">
      <InfoAccounts />
      <Transactions />
    </div>
  );
}
