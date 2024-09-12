# {{cookiecutter.name}}

## Notes on Sending Emails
- Emails may not be sent out when certain addresses are used in the "from" parameter (e.g. "testing@dev.gapps.telus.com" or "testing123@dev.gapps.telus.com")
- The combined size of all file attachments cannot exceed 20MB
- The mail server may block messages containing [certain attachments](https://support.google.com/mail/answer/6590#zippy=%2Cmessages-that-dont-have-attachments%2Cmessages-that-have-attachments) (see the link for more details)

---

This is a sample Typescript Express (using version 4.18.2) application that calls an API endpoint on an email proxy service [Outbound Email through API Client Service](docs/OutboundEmailProxy.png), demonstrating the following feature implementations:  
- [Logging](docs/logging-nodejs.md)
- [Unit Testing](docs/unit-tests-nodejs.md)
- [BDD Testing](docs/bdd-tests-nodejs.md)
- [Secret Manager Access](docs/secret-setup.md)
- [CodeQL Integration](docs/codeql.md)
- [Risk Engine Integration](docs/risk-engine.md)
- [Swagger File Creation](docs/swagger-creation.md)
- [Send Email Example Setup](docs/api-call-setup.md)
- [GKE Cron Job](docs/gke-cron-job.md)  
- [Cloud Scheduler for PubSub](docs/cloud-scheduler.md)  
- [Backstage Software Catalog](docs/backstage-catalog.md)
- [Log-Based Metrics and Slack Notifications](docs/log-metrics.md)
- [Health Check](docs/healthcheck.md)
- [System Meta Editor](.systemDiagram/sme-json.md)

> [!IMPORTANT]
> The application currently does not support ESLint9. Merging dependabot bump ESLint recommendations on GitHub will cause dependency errors in the application. Please check for compatibility before updating to ESLint9.

This project also includes [API Documentation Template](API-Documentation_v1.0.md) that teams will be required to complete when creating APIs.

## Prerequisite
Before you begin, make sure that you have access to a GCP Project where you would be able to connect to and test your applications. If you need to request for a new GCP project, follow the instruction [here]( https://onboard.cloudapps.telus.com/onboard/home )  

In order to run this sample application, the GCP Secret Manager for your project must be enabled. Also please ensure that you have acquired the Send Email API and have
[configured the application](docs/api-call-setup.md#setreview-configuration-file-values) correctly before running it.

## Select your development environment:

### [Github Codespaces Development](#using-github-codespaces-development)
### [Local Development](#using-local-development)

___
## **Using Github Codespaces Development**

1- Make sure that Github Codespaces feature is activated for your Github account.  
2- Click on the green 'Code' button, select Codespaces tab and 'New Codespace' button.  
3- Wait for the codespace VM to be initialized. At this point a development VM is being provisioned and initialized which will include the sample application, google cloud SDK, and any required files associated with the features selected in the cookiecutter file when you created the repository from the template.

### Developing in Github Codespaces for a Google Cloud Project
If you have a Google Cloud Project, follow the steps below to activate your GCP Cloud SDK:

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

Starting from the root directory of your local repository, run:
```
cd app
```


To install the application's dependencies and start the application on your local machine, run the commands:
```
npm install
npm run dev

```
By default, `npm run dev` starts Express with `--address=localhost` which suffices for local testing. Use `npm run build` and `npm run start` when deploying the application to a container.

Alternatively, you can use `yarn` instead of `npm`:
```
yarn install
yarn run dev
```

See [Swagger File Creation](docs/swagger-creation.md) for details, to generate/update swagger file (.oas3.json), run:

    npm run docs
      

#### **Generating Test Coverage**

To generate the test coverage report for the application, run the command:
```
npm run test-coverage
```

This will generate the test coverage report and save it in the `app/coverage folder. The report will be available in multiple formats, including JSON summary and LCOV.
___