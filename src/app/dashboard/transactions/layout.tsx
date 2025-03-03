import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Transactions",
    description: "Control In Your Transactions Records",
};

export default function TransactionsLayout({
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
