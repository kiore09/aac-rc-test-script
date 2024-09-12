# {{cookiecutter.name}}

This is a sample Google Memorystore (Redis) Application demonstrating the following feature implementation:  
- [Logging](docs/logging-java.md) 
- [Environment Configuration](docs/env-config.md)
- [Unit Testing](docs/unit-tests-java.md)
- [CodeQL Integration](docs/codeql.md)
- [Risk Engine Integration](docs/risk-engine.md)
- [Swagger File Creation](docs/swagger-creation.md)
- [Memorystore (Redis) Integration](docs/memstoreRedis.md)
- [GKE Cron Job](docs/gke-cron-job.md)  
- [Cloud Scheduler for PubSub](docs/cloud-scheduler.md)  
- [Backstage Software Catalog](docs/backstage-catalog.md)
- [Log-Based Metrics and Slack Notifications](docs/log-metrics.md)
- [Health Check](docs/healthcheck.md)
- [System Meta Editor](.systemDiagram/sme-json.md)

This project also includes [API Documentation Template](API-Documentation_v1.0.md) that teams will be required to complete when creating APIs.

## Prerequisites

- For local development, you will need to have a Redis server running locally. Follow [these steps](docs/memstoreRedis.md#running-redis-server-for-local-development) to install
and run the server.
- To run the app on GKE, you must have a Redis instance provisioned in your GCP project (follow [these steps](docs/memstoreRedis.md#provisioning-a-redis-instance-on-gcp) if you do not have one created already.) Redis instances in your GCP project **are not accessible from your local machine or from codespaces.**

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

In your terminal, `cd` into the root directory of your local repository. Enter the following command to test your sample application directly in the terminal:

    mvn spring-boot:run

This will run the application with the JVM arguments specified in your [pom.xml](pom.xml) (check the configuration comment under `spring-boot-maven-plugin`.)

To package the sample app into a runnable JAR file, enter the following command:

    mvn package

This should produce a JAR file in a directory named `target/` (for example `target/spring-boot-0.0.1-SNAPSHOT.jar`). To run the app, enter the following command:

    java -jar <path to your JAR file>

In our example, `<path to your JAR file>` would be replaced with `target/spring-boot-0.0.1-SNAPSHOT.jar`.
Applications run using `java -jar ...` do not use the JVM arguments listed in `pom.xml`, so they must be entered explicitly in the command (as in the
[Dockerfile](Dockerfile).) For example:

    java -Xmx2048m -Xdebug -DargumentName=someValue -jar <path to your JAR file>

Once the app has started: go to your web browser, type `localhost:8080` into the address bar, and play around with the webpages.

To stop the app, use `Ctrl + C` in the terminal.

To package the app again after having made changes, run:

    mvn clean
    mvn package

#### **Running Tests and Generating Test Coverage**

To run tests and generate the test coverage report for the application, run the command:
```
mvn test
```

This will run all the tests and generate the test coverage report `jacoco.xml` and `index.html` in the `target/site/jacoco`using JaCoCo. You can open the `index.html` file in that directory to view the coverage report in a web browser.


___