import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Login",
    description: "Login To Golden Bank",
};

export default function LoginLayout({
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
