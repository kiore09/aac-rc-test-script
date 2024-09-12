# {{cookiecutter.name}}

This is a sample NextJS Single-page Application Template.

This project includes the following features:

- NextJS 14 [App Router](https://nextjs.org/docs/app/building-your-application) directory structure
- [TELUS UDS](https://www.telus.com/universal-design-system/components/allium) Component Library
- [CSS Modules](https://github.com/css-modules/css-modules) Stylesheets
- [Cypress Unit and E2E tests](docs/cypress-testing.md)
- [Health Check](docs/healthcheck.md)
- [CodeQL Integration](docs/codeql.md)
- [Risk Engine Integration](docs/risk-engine-nextjs.md)
- [Backstage Software Catalog](docs/backstage-catalog.md)

> [!IMPORTANT]
> The application currently does not support ESLint9. Merging dependabot bump ESLint recommendations on GitHub will cause dependency errors in the application. Please check for compatibility before updating to ESLint9.

## Select your development environment:

### [Github Codespaces Development](#using-github-codespaces-development)
### [Local Development](#using-local-development)

___
## **Using Github Codespaces Development**

1- Make sure that Github Codespaces feature is activated for your Github account.  
2- Click on the green 'Code' button, select Codespaces tab and 'New Codespace' button.  
3- Wait for the codespace VM to be initialized. At this point a development VM is being provisioned and initialized which will include the sample application, Google Cloud SDK, and any required files associated with the features selected in the cookiecutter file when you created the repository from the template.

### Developing in Github Codespaces for a Google Cloud Project
If you have a Google Cloud Project, follow the steps below to activate your Google Cloud SDK:

#### **GCP Cloud SDK Integration + Activation**
From a new terminal within codespaces, run the following command to initialize Google Cloud SDK:

    gcloud init --no-launch-browser

Follow the prompts to authenticate and connect to your GCP Project.

#### **GCP Application Authentication**
If you want your local application to temporarily use your own user credentials for API access, run:

    gcloud auth application-default login --no-launch-browser

See [Local Application Authentication](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login) for more detail instruction.

___

## **Using Local Development**
First, download the Google Cloud CLI from [here](https://cloud.google.com/sdk/docs/install) onto your local machine.

On Windows, the download will include a Google Cloud CLI Shell in which you will input commands for the following steps.

On Linux systems, you may simply input the commands in your terminal.

Follow the instruction [here](https://simplify.telus.com/docs/developer-docs/docs/guides/setting-up-your-local-development-environment-2Lo7y4qy7DezIYk1ltfykF.md) to setup your local development environment network.

#### **Cloning This Repo**
To clone this repo onto your local machine:

1- Click on the green 'Code' button, select the Local tab, and copy the URL in the box.   
2- In your terminal, enter the following command where `<copied url>` is replaced with the URL you copied

    git clone <copied url>

You may have to enter your Github credentials to execute this command. Confirm that the repo exists in your current
directory by entering the `dir` (for Windows) or `ls` (for Linux) command into your terminal.


### Developing in local environment for a Google Cloud Project
If you have a Google Cloud Project, follow the steps below to activate your GCP Cloud SDK:

#### **GCP Cloud SDK Integration + Activation**
From the Google Cloud CLI Shell/terminal, run the following command to initialize Google Cloud SDK:

    gcloud init --no-launch-browser

Follow the prompts to authenticate and connect to your GCP Project.

#### **GCP Application Authentication**
If you want your local application to temporarily use your own user credentials for API access, run:

    gcloud auth application-default login --no-launch-browser

See [Local Application Authentication](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login) for more detail instruction.
___

## **Try the sample application**

### Node Version

This project runs on Node version [20.11.0](https://nodejs.org/en). To manage multiple versions of Node.js on your machine, you can use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm).

### Running the Project

To install the Next.js application's dependencies and start the application, run the following commands in the root directory:

```
npm install
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests
This repository contains a set of end-to-end and component tests implemented using Cypress. To open the Cypress Test Runner, run the following command:

```bash
npm run cypress
```
This will launch the Cypress Test Runner, where you can select and run individual tests or the entire test suite.

To run tests located in the cypress folder in headless mode (without the Test Runner interface), use the following command:

```bash
npm run test
```
This command will execute tests inside the cypress folder in the background and provide the test results in the console.

See [Unit Testing-Cypress](docs/cypress-testing.md) for more information.