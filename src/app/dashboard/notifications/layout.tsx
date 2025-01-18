import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Notifications",
    description: "Control In Your Notifications",
};

export default function AccountsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    );
}
