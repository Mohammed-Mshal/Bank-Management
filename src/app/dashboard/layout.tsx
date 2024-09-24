import type { Metadata } from "next";
import './dashboard.css'
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Of Your account",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-black min-h-screen">{children}</div>;
}
