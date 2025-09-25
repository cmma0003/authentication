"use server";

import {signIn, signOut} from "@/lib/auth/auth";

export async function signInCognito (callbackUrl: string) {
    await signIn("cognito", {
        redirectTo: callbackUrl,
    });
}

export async function signOutCognito () {
    await signOut();
}