"use server";

import {signIn, signOut} from "@/lib/auth/auth";

export async function signInCognito () {
    await signIn("cognito");
}

export async function signOutCognito () {
    await signOut();
}