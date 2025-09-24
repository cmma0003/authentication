/**
 * @jest-environment node
 */

import {
    CognitoIdentityProviderClient,
    AdminGetUserCommand, AdminLinkProviderForUserCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { mockClient } from "aws-sdk-client-mock";
import {linkFederatedUserToExistingProfile} from "@/lib/auth/utils";

describe("Link Google federated users to existing profile tests", () => {

    it("Returns false when no user found", async () => {
        const cognitoClient = mockClient(CognitoIdentityProviderClient);
        cognitoClient
            .on(AdminGetUserCommand)
            .rejects(Object.assign(new Error("User not found"), { name: "UserNotFoundException" }));

        const result = await linkFederatedUserToExistingProfile(user, {});
        expect(result).toBe(false);
    });

    it("Link federated user to existing profile when profile has no identities", async () => {
        const cognitoClient = mockClient(CognitoIdentityProviderClient);
        cognitoClient.on(AdminGetUserCommand).resolves({
            UserAttributes: [
                { Name: "email", Value: "user@example.com" }
            ],
        });
        cognitoClient.on(AdminLinkProviderForUserCommand).resolves({});
        const result = await linkFederatedUserToExistingProfile(user, { sub: "abc-123-456"});
        expect(result).toBe(true);
        expect(cognitoClient.commandCalls(AdminLinkProviderForUserCommand).length).toBe(1);
    });

    it("Link federated user to existing profile when profile identities is empty", async () => {
        const cognitoClient = mockClient(CognitoIdentityProviderClient);
        cognitoClient.on(AdminGetUserCommand).resolves({
            UserAttributes: [
                { Name: "email", Value: "user@example.com" },
                { Name: "identities", Value: JSON.stringify([]) },
            ],
        });
        cognitoClient.on(AdminLinkProviderForUserCommand).resolves({});
        const result = await linkFederatedUserToExistingProfile(user, { sub: "abc-123-456"});
        expect(result).toBe(true);
        expect(cognitoClient.commandCalls(AdminLinkProviderForUserCommand).length).toBe(1);
    });

    it("Link federated user to existing profile when profile identities does not include Google", async () => {
        const cognitoClient = mockClient(CognitoIdentityProviderClient);
        cognitoClient.on(AdminGetUserCommand).resolves({
            UserAttributes: [
                { Name: "email", Value: "user@example.com" },
                { Name: "identities", Value: JSON.stringify([
                        {
                            dateCreated: "1758210373293",
                            userId: "facebook-123",
                            providerName: "Facebook",
                            providerType: "Facebook",
                            primary: "false"
                        }
                    ]) },
            ],
        });
        cognitoClient.on(AdminLinkProviderForUserCommand).resolves({});
        const result = await linkFederatedUserToExistingProfile(user, { sub: "abc-123-456"});
        expect(result).toBe(true);
        expect(cognitoClient.commandCalls(AdminLinkProviderForUserCommand).length).toBe(1);
    });

    it("Does not link Google federated user to existing profile when already linked", async () => {
        const cognitoClient = mockClient(CognitoIdentityProviderClient);
        cognitoClient.on(AdminGetUserCommand).resolves({
            UserAttributes: [
                { Name: "email", Value: "user@example.com" },
                { Name: "identities", Value: JSON.stringify([
                        {
                            dateCreated: "1758210373293",
                            userId: "google-123",
                            providerName: "Google",
                            providerType: "Google",
                            primary: "false"
                        }
                    ]) },
            ],
        });
        const result = await linkFederatedUserToExistingProfile(user, {});
        expect(result).toBe(true);
    });
});

const user = {
    id: "123-456-abc",
    email: "user@example.com"
}
