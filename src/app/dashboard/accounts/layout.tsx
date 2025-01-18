import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Accounts",
    description: "Control In Your Accounts",
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
