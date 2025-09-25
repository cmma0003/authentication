import SignIn from "@/components/features/signin/signIn";

interface PageProps {
    searchParams?: { callbackUrl: string };
}

export default function SignInPage({ searchParams }: PageProps) {
    const callbackUrl = searchParams?.callbackUrl ?? "/";
    return <SignIn callbackUrl={callbackUrl}/>;
}