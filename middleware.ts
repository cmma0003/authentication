export { auth as middleware } from "@/lib/auth/auth";

export const config = {
    matcher: [
        {
            source:
                "/((?!api/auth|_next/static|_next/image).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};