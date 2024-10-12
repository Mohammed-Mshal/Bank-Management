import React from "react";
import InfoAccounts from "../_components/InfoAccounts";
import AnalyticChart from "../_components/AnalyticChart/AnalyticChart";
import Transactions from "../_components/Transactions";
export default async function DashboardPage() {
  return (
    <div className="main_dashboard py-4 md:pe-2">
      <InfoAccounts />
      <AnalyticChart />
      <Transactions />
    </div>
  );
}
