import type { Metadata } from "next";
import "./dashboard.css";
import AsideDashboard from "../_components/Aside/AsideDashboard";
import SecondNavbar from "../_components/SecondNavbar";
import HeaderDashboard from "../_components/HeaderDashboard";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Of Your account",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen bg-black flex">
      <AsideDashboard />
      <div className="flex-1 px-2 py-4 main_content">
        <SecondNavbar />
        <HeaderDashboard />
        {children}
      </div>
    </div>
  );
}
