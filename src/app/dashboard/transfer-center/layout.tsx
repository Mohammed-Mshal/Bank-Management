import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Transfer Center",
    description: "Transfer Money From Your Accounts",
};

export default function TransferLayout({
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
