import React from "react";
import {Button} from "@/components/ui/button";
import {signOutCognito} from "@/lib/auth/actions";
import {auth} from "@/lib/auth/auth";

export default async function HomePage() {
    const session = await auth();

    return (
      <div className="flex flex-col items-center justify-center w-full p-6 gap-1.5">
          <h2 className="text-3xl font-bold">Welcome {session?.user?.email}!</h2>
          <form action={signOutCognito}>
              <Button type="submit">Sign out</Button>
          </form>
      </div>
    );
}
