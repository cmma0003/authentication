import SignIn from "@/components/features/signin/signIn";

interface PageProps {
    searchParams?: { callbackUrl: string };
}

export default async function SignInPage({ searchParams }: PageProps) {
    const callbackUrl = (await searchParams)?.callbackUrl ?? "/";
    return <SignIn callbackUrl={callbackUrl}/>;
}