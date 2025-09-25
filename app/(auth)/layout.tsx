import React from "react";

export default function AuthLayout({
    children
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen flex w-full">
            <div className="w-1/2 flex flex-col justify-center items-center p-12 text-white relative overflow-hidden"
                 style={{ background: `linear-gradient(135deg, #5E47EB 0%, #1A1829 100%)`,}}>
                <div className="max-w-md text-center space-y-8 relative z-10">
                    <div className="space-y-0">
                        <p className="text-xl leading-relaxed opacity-90">
                            Company marketing info here
                        </p>
                    </div>
                </div>

                <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
            </div>
            <div className="w-1/2 flex items-center justify-center p-12 bg-white">
                <div className="w-full max-w-md">
                    { children }
                </div>
            </div>
        </main>
    );
}