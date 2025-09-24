import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import React from "react";
import {signInCognito} from "@/lib/auth/actions";
import {UserIcon} from "@heroicons/react/24/outline";

export default function SignIn() {
    return (
        <Card className="shadow-lg border border-gray-100">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-3xl font-semibold text-[#1A1829]">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                    Sign in to access Nopan portal
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
                <form action={signInCognito}>
                    <Button className="w-full font-medium text-base h-12" type="submit">
                        <UserIcon/>
                        Sign in with Cognito
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">More options coming soon</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Need help?{" "}
                        <a href="#" className="text-[#5E47EB] hover:underline font-medium">
                            Contact support
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}