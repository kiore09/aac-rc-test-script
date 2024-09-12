# {{cookiecutter.name}}

This is a sample Express Typescript (using version 4.18.2) GraphQL template with integrated Google Cloud SQL application to demonstrate the following feature implementation:
- [Logging](docs/logging-nodejs.md)
- [Unit Testing](docs/unit-tests-nodejs.md)
- [CodeQL Integration](docs/codeql.md)
- [Risk Engine Integration](docs/risk-engine.md)
- [GraphQL](docs/graphql.md)
- [Secret Manager Access](docs/secret-setup.md)
- [Cloud SQL](docs/sql.md)
- [Swagger File Creation](docs/swagger-creation.md)
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

> [!IMPORTANT] 
> Cloud SQL is not accessible from Codespaces development environment. In order to test your code connecting to Cloud SQL, you need to follow the instructions for local development, or deploy your code to GKE. 

In order to run the GraphQL sample application, you will need to ensure that you have setup the following:

### **Setup SQL Database**
The sample application requires a Cloud SQL database setup beforehand. [This document](docs/sql.md) serves as a guide for creating a database for the demo.

### **Setup Test Secret Values**
The sample application requires two secrets with names `secretUserKey` and `secretKeyName` in your GCP project before it can compile properly. [This document](docs/secret-setup.md) serves as a guide for creating any secrets you might need for the demo.

## Select your development environment:

### [Github Codespaces Development](#using-github-codespaces-development)
### [Local Development](#using-local-development)
___
## **Using Github Codespaces Development**

1- Make sure that Github Codespaces feature is activated for your Github account.  
2- Click on the green 'Code' button, select Codespaces tab and 'New Codespace' button.  
3- Wait for the codespace VM to be initialized. At this point a development VM is being provisioned and initialized which will include the sample application, google cloud SDK, and any required files associated with the features selected in the cookiecutter file when you created the repository from the template.

**This sample app requires an active GCP project, follow the steps below to activate your GCP Cloud SDK:**

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

**This sample app requires an active GCP project, follow the steps below to activate your GCP Cloud SDK:**

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
 ## Adding Collaborators and Working Together
 The owner of this repository can add additional admins or collaborators (documentation on access to repositories can be found [here](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/repository-roles-for-an-organization).)
 
 You may currently not have the ability to push code to your `main` branch without additional reviewers. To further customize the rules governing how code is pushed to your branches, [edit your branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule).
 
 <img src="https://user-images.githubusercontent.com/50889765/191091612-071ccdd1-a4c9-4910-b10a-055c44180ef5.png" width=40% height=40% />
 
 We highly recommend that you add an additional reviewer/approver; however, technically as an admin and repo creator, you can bypass by checking the checkbox "*Merge without waiting for requirements to be met*"
 
 ___
 
 ##  GKE Prerequisite
 In order to access a GCP resource from your application in GKE, you need to configure the Workload Identity Federation (WIF) and Role-based Access Control (RBAC) for your application workload in GKE. This will create the GKE service account (KSA) and the required mapping to the corresponding Google Service account (GSA) to provide access to GCP resources.
 
 Follow the guideline provided [here](https://github.com/telus/tf-module-gcp-workload-identity) to configure access for your GKE workload.
 
 Note: For Java application, it is recommended to add the initialDelays flag to the helm files when configuring the probes to avoid CrashLoopBackOff Error. Your helm files might look something like this: 
 
     livenessProbe:
         initialDelaySeconds: 40
         httpGet:
             path: /liveness 
             port: 8080
         initialDelaySeconds: 30
         periodSeconds: 30
             # httpHeaders:
             #   - name: Authorization
             #     value: Basic dGVjaGh1YjpwYXNzdzByZA==
 
     readinessProbe:
         initialDelaySeconds: 40
         httpGet:
             path: /readiness 
             port: 8080
         initialDelaySeconds: 30
         periodSeconds: 30
             # httpHeaders:
             #   - name: Authorization
             #     value: Basic dGVjaGh1YjpwYXNzdzByZA==
 
 ## Including CI/CD for your API
 👉 **Prerequisite** Add IAM binding for the `cicd-service-account@<PROJECT_ID>.iam.gserviceaccount.com` to your application repositories via terraform, see [example](https://github.com/telus/tf-infra-cdo-horizon/blob/master/terraform/iam.tf#:~:text=Blame-,module%20%22cicd%2Dwif%2Diam%22%20%7B,%7D,-module%20%22cloudsql%2Dsa)
 
 For more information on configuring CI/CD with Cloud Deploy and GitHub Workflows, please refer to this [setup-guide-gke-cicd](https://github.com/telus/ep-cicd-generator/blob/main/docs/setup-guide-gke-cicd.md) repository from Engineering Productivity.
 Once you've completed the CI/CD Intake process through [EP CI/CD Generator](https://simplify.telus.com/create/templates/default/ep-generators) on Simplify Hub, expect to receive a pull request on this repository shortly thereafter.
 
 View a tutorial video on how to [Add your Github repository to CI/CD Workload Identity Access List](https://drive.google.com/file/d/1ZlfZi7XW0Pew_AS9Fs-Hs1TCoSjv3yNA/view)
 
 <img src="https://user-images.githubusercontent.com/50889765/175146339-67cd2882-de2c-4bda-968e-5d2b75115fed.png" width=25% height=25% />
 
 👉 **Merge** the Pull Request. If Merging is blocked, see instructions above on [Branch Protection Rules](README.md#adding-collaborators-and-working-together) **or** click *Add your review* then approve
 
 <img src="https://user-images.githubusercontent.com/50889765/175160302-8b4ef6f0-92b4-4449-80ba-c818d5689d47.png" width=40% height=40% />
 
 ___
 
 ## Port Forwarding a Deployed Application Tutorial Video
 
 View this tutorial video on how to [Port-forward a GKE workload to your local host](https://drive.google.com/file/d/1tNU-iZ80pcBnBSPSYQfFe_z0p0VDPB73/view?usp=sharing)
 
 GCloud CLI Installation: https://cloud.google.com/sdk/docs/install
 
 Command line cheat-sheet: [cheatSheet.txt](docs/cheatSheet.txt)
 
 ___
 
 ## Deploying the Application to Production
 Given that your application has been tested in non-production, follow [this guide](docs/production.md) to promote your application to your production GCP project.
 
 ___
 
 ## Your feedback is important to us
 📝 We are continuously adding more sample applications to the Software Template, implementing new features and functionalities. To help us improve the quality and content of our Software Template, we appreciate your feedback by completing [this short survey](https://forms.gle/UbotjxDVsDmTB3D16), or posting your comments to our [Slack Channel](https://telus-cdo.slack.com/archives/C02KRKNFA2J).

