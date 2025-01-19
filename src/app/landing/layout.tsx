import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Golden Bank",
    description: "Modern Banking Experience",
};

export default function LandingLayout({
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
