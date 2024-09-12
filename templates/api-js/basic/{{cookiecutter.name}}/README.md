# {{cookiecutter.name}}

This is a sample Express (using version 4.18.2) Hello World Application to demonstrate the following feature implementation:
- [Logging](docs/logging-nodejs.md)
- [Lifecycle](docs/lifecycle.md)
- [Unit Testing](docs/unit-tests-nodejs.md)
- [CodeQL Integration](docs/codeql.md)
- [Risk Engine Integration](docs/risk-engine.md)
- [Swagger File Creation](docs/swagger-creation.md)
- [GKE Cron Job](docs/gke-cron-job.md)  
- [Cloud Scheduler for PubSub](docs/cloud-scheduler.md)  
- [Backstage Software Catalog](docs/backstage-catalog.md)
- [Log-Based Metrics and Slack Notifications](docs/log-metrics.md)
- [Health Check](docs/healthcheck.md)

This project also includes [API Documentation Template](API-Documentation_v1.0.md) that teams will be required to complete when creating APIs.

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

To install the application's dependencies and start the application, run the commands:
```
npm install
npm run start
```

Alternatively, you can use `yarn` instead of `npm`:
```
yarn install
yarn run start
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