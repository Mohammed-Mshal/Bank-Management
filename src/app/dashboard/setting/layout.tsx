import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Settings",
    description: "Settings Of Your Personal Account",
};

export default function SettingsLayout({
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
