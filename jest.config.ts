import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
    dir: "./" ,
});

const config : Config = {
    clearMocks: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    },
};

export default async (): Promise<Config> => {
    const nodeConfig = await createJestConfig({
        ...config,
        displayName: "node-tests",
        testEnvironment: "node",
        testMatch: ["**/*.test.ts"],
    })();

    const jsdomConfig = await createJestConfig({
        ...config,
        displayName: "jsdom-tests",
        testEnvironment: "jsdom",
        testMatch: ["**/*.test.tsx"],
        setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    })();

    return {
        projects: [nodeConfig, jsdomConfig],
    };
};
