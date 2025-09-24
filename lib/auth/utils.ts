import {Profile, User} from "@auth/core/types";
import {
    AdminGetUserCommand,
    AdminLinkProviderForUserCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_COGNITO_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_PORTAL_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_PORTAL_SECRET_ACCESS_KEY!,
    },
});

export const linkFederatedUserToExistingProfile = async (
    user: User,
    profile: Profile) => {
    try {
        const userFound = await cognitoClient.send(
            new AdminGetUserCommand({
                UserPoolId: process.env.COGNITO_USER_POOL_ID!,
                Username: user.email!,
            })
        );

        const identitiesAttr = userFound.UserAttributes?.find(attr => attr.Name === "identities");

        let alreadyLinked = false;
        if (identitiesAttr?.Value) {
            const identities = JSON.parse(identitiesAttr?.Value);
            alreadyLinked = identities.some(
                (id: { providerName: string; }) => id.providerName.toLowerCase() === "google"
            );
        }

        if (!alreadyLinked) {
            await cognitoClient.send(
                new AdminLinkProviderForUserCommand({
                    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
                    DestinationUser: {
                        ProviderName: "Cognito",
                        ProviderAttributeValue: user.email!,
                    },
                    SourceUser: {
                        ProviderName: "Google",
                        ProviderAttributeName: "Cognito_Subject",
                        ProviderAttributeValue: profile.sub!,
                    },
                })
            );
        }

    } catch (error) {
        console.error(`Error occurred while linkFederatedUserToExistingProfile: ${error}`);
        return false;
    }
    return true;
}
