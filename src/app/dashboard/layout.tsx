import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Of Your account",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-red-800">{children}</div>;
}
