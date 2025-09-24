import NextAuth from "next-auth";
import Cognito from "@auth/core/providers/cognito";
import {linkFederatedUserToExistingProfile} from "@/lib/auth/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Cognito({
            authorization: { params: { scope: "openid email profile" } },
            checks: ["pkce", "nonce"]
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth?.user;
        },
        redirect: async ({ url, baseUrl })=> {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        signIn: async ({ user, account, profile }) => {
            if (account?.provider.toLowerCase() === "cognito" && profile) {
                return await linkFederatedUserToExistingProfile(user, profile);
            }
            return true;
        }
    },
});
