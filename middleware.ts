export { auth as middleware } from "@/lib/auth/auth";

export const config = {
    matcher: ['/((?!api/auth|signin|_next/static|_next/image|static|images|.well-known).*)'],
};
