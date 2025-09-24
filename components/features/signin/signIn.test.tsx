import {fireEvent, render} from "@testing-library/react";
import SignIn from "@/components/features/signin/signIn";
import {signInCognito} from "@/lib/auth/actions";

jest.mock("@/lib/auth/actions", () => ({
    signInCognito : jest.fn()
}));

describe("SignIn component tests", () => {
    it("renders", () => {
        render(<SignIn />);

        expect(document.querySelector(".text-3xl")?.textContent).toBe("Welcome back");
        expect(document.querySelector(".text-lg")?.textContent).toBe("Sign in to access Nopan portal");
        expect(document.querySelector("button")).toBeInTheDocument();
    });

    it("calls signInCognito when form is submitted", () => {
        render(<SignIn />);
        const button = document.querySelector("button");
        fireEvent.click(button!);
        expect(signInCognito).toHaveBeenCalled();
    });

})