import React from "react";

export default function AppLayout({
    children
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            { children }
        </main>
    );
}