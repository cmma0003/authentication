# Portal

The portal will serve as the primary customer-facing interface of our solution. Its purpose is to provide a unified platform where customers can both initiate and manage their business relationship with Nopan, while ensuring regulatory and operational requirements are met.
Related ADRs about [requisites](https://www.notion.so/nopan/Portal-requirements-25e42051c87680c3a43ee12af2e0409a) and [tech choices](https://www.notion.so/nopan/Portal-tech-choices-25a42051c87680b080dde1dd0b6e8872).

## Getting started
### Prerequisites

In order to be able to run and contribute to this project from your local machine, make sure having the following installed:
* Node.js 22
* npm 10

### Installation
1. Clone repository `git clone git@github.com:nopan-solutions/portal.git`.
2. Run `npm install`.
3. Start the development server by running:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## npm scripts
#### `npm run build`
Builds the web application. Output is placed on `.next` folder.

#### `npm run dev`
Starts development server on [http://localhost:3000](http://localhost:3000).

#### `npm run start`
Run the web application in production mode.

#### `npm run lint`
Runs ESLint.

#### `npm run test`
Run unit tests.

## Tech stack
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
