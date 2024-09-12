# Basic Application Project Template 

This template repository can be used as a starting point for developing backend cloud-based applications / services to be deployed on Google Cloud Platform (GCP). There are currently two ways to utilize these templates:
* By logging on to [Simplify](https://simplify.telus.com/create?filters%5Bkind%5D=template&filters%5Buser%5D=all) (GUI) and create from one of the templates
  - Package includes standard features: 
    - **Logging** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs/logging-java.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/logging-nodejs.md) 
    - **Unit Test** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs/unit-tests-java.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/unit-tests-nodejs.md)
    - **CodeQL Integration** [[Java]](shared/docs/codeql/codeql.md) / [[NodeJS]](shared/docs/codeql/codeql.md)
    - **Swagger File Creation** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs/swagger-creation.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/swagger-creation.md)
    - **Risk Engine Integration** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs/risk-engine.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/risk-engine.md)
    - **Sample Application**
    - **Sample GKE Cron Job**
    - **Backstage Catalog Automate** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs//backstage-catalog.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/backstage-catalog.md)
    - **Log-Based Metrics and Slack Notifications** [[Java]](templates/api-java/basic/%7B%7Bcookiecutter.name%7D%7D/docs/log-metrics.md) / [[NodeJS]](templates/api-js/basic/%7B%7Bcookiecutter.name%7D%7D/docs/log-metrics.md)
  * Option to include **CI/CD** to auto-generate the pull request is available
* Through the use of this GitHub template repository [[instructions below]](#use-starter-templates-via-this-github-template-repository)
  * Package includes standard features listed above
  * No option to include CI/CD, follow the intake process instead, see [here](https://github.com/telus/ep-cicd-generator/blob/main/setup-guide-gke-cicd.md)

## Available Templates ##
| Template | Description | Status |
| --- | --- | --- |
| **API** *Java* Starter Template | A sample SpringBoot Java application with the option to include a GCP service for the application to interact with (apiClient, Google Cloud Storage, Secret Manager, Cloud SQL, Cloud Memorystore, Firestore, PubSub, GraphQL, and Unleash) | Production |
| **API** *NodeJS* Starter Template | A sample NodeJS application with the option to include a GCP service for the application to interact with (apiClient, Google Cloud Storage, Secret Manager, Cloud SQL, Cloud Memorystore, Firestore, PubSub, GraphQL, and Unleash) | Production |
| **API** *NodeJS-Fastify* Starter Template | A sample NodeJS Fastify application with the option to include a GCP service for the application to interact with (Google Cloud Storage, Cloud SQL, Firestore, and apiClient) | Production |
| **API** *NodeTS* Starter Template | A sample NodeJS Fastify application with the option to include a GCP service for the application to interact with (Google Cloud Storage, Secret Manager, Cloud SQL, and Firestore) | Production |
| **API** *NextJS* Starter Template | A sample NextJS application Basic or with sample API integration, which includes Telus UDS, Cypress Testing, Risk-Engine integration. | Production |
| **ETL** *Java* *NodeJS* Starter Template | A sample Extract-Transform-Load application written in Java and Nodejs utilizing Cloud Functions and GCS | Production |
| **DLP** *Java* *NodeJS* Starter Template | A sample application written in Java and Nodejs that classifies and de-identifies files using Cloud Data Loss Prevention, Cloud Functions and GCS | Production |
| **EDA** *Java* *NodeJS* Starter Template | A sample Event Driven Architecture solution written in Java and Javascript creating any of the following: **Publisher** app with Firestore, **Triggering Function** with Cloud Function & GCP PubSub, **Subscriber** app subscribing to a topic in GCP PubSub and updating document in Firestore | Production |   
| **CQRS** *Java* Starter Template | A sample Command & Query Responsibility Segregation solution written in Java creating any of the following: **Command** service writing to PostgreSql and publish event to PubSub Topic, **Cloud Function** to pull the event from GCP PubSub and persist data in Cloud Firestore, **Query** service to read data from Firestore. | Production |

## Use Starter Templates via this GitHub Template Repository
## Prerequisite
Before you begin, make sure that you have access to a GCP Project where you would be able to connect to and test your applications. If you need to request for a new GCP project, follow the instruction [here]( https://onboard.cloudapps.telus.com/onboard/home )  

## Setup
### Create a repository from this template
Click the big green button Use this template or click <a href="../../generate">here</a>.  
Enter a Repository name and click Create repository from template. Tip: Use Telus/ as repository owner.
Head over to the created repository and complete the setup.  

### Complete setup
Update the 'cookiecutter.yaml' file to generate the project repository based on your settings.  
**Important:** A GitHub Action will be triggered as soon as the first commit is done to generate the manifests. The fully populated cookiecutter.yaml should be the first commit.

### cookiecutter.yaml
The following general attributes defined in this file are used to generate all the manifests  

#### **General Attributes (Mandatory)**
Attribute | Description
------------ | -------------
name | Name of the Project/Application. This really only affects the readme file

### **Sample Application**
In addition to the above attributes, you may configure the cookiecutter.yaml file to have a sample _Hello-World_ application created based on one of the supported programming languages and GCP services.  
To generate the sample application, update the following sections of the 'cookiecutter.yaml' file:

Attribute | Description
---------- | ------------
sampleCode | Update this section to generate the sample application
programmingLanguage | choose one of: <ul><li>java</li><li>nodejsExpress</li><li>nodetsExpress</li><li>nodejsFastify</li><li>nodetsFastify</li><li>nextjs</li></ul>
gcpServiceSample | choose one of: <ul><li>basic</li><li>gcstorage</li><li>secretmgr</li><li>postgresql</li><li>pubsub</li><li>firestore</li><li>memstore</li><li>apiClient</li><li>gqlPsql</li><li>primavera</li><li>etlStorageCf</li><li>dlpStorageCf</li><li>edaPublisher</li><li>edaSubscriber</li><li>edaFsTriggerCf</li><li>cqrsPubsubTriggerCf</li><li>cqrsCmd</li><li>cqrsQuery</li><li>unleashClient</li><li>singlePage</li><li>multiPage</li><li>singlePageAPI</li><li>multiPageAPI</li></ul>

### **GCP Service Configuration**
The following sections of the cookiecutter.yaml file allow you to configure the parameters for the selected GCP service sample application. 

#### **Cloud Storage (gcstorage) Attributes**
Attribute | Description
------------ | -------------
gcstorage | Uncomment this section to configure the Cloud Storage Bucket name used by the sample application.
storageBucket | The name of your Google Cloud storage bucket.

#### **Secret Manager (secretmgr) Attributes**
Attribute | Description
------------ | -------------
sampleSecret | The name of a secret in your GCP Project's Secret Manager, to be used by the sample application.

#### **Postgresql (postgresql) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the Firestore collection.
dbName | The name of the database inside a Cloud SQL instance.
secretUserKey | The name of the Secret Manager secret that holds the database username.
secretKeyName | The name of the Secret Manager secret that holds the database password.

#### **Pub/Sub (pubsub) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the subscription and topic.
topicName | The name of the topic where messages will be published to.
subscriptionName | The name of the subscription where messages will be pulled from.

#### **Firestore (firestore) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the firestore collection.
firestoreCollection | The name of the Firestore collection that this sample application will access.

#### **Memorystore for Redis (memstore) Attributes**
Attribute | Description
------------ | -------------
redisIp | The IP address of the redis instance this sample application will connect to.
redisPort | The port that the redis instance is listening on.
redisName | The name of the redis instance (used to generate terraform files).

#### **API Client (apiClient) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the client secrets.
clientIdSecretName | The name of the secret holding the access token client id.
clientSecretName | The name of the secret holding the access token client secret.
apiScope | The scope of the API endpoint to be called by the client.
apigwTokenUrl | The URL called to retrieve the access token.
apiEndpointUrl | The URL of the API endpoint to be called by the client.

#### **GraphQL Postgresql (gqlPsql) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the Firestore collection.
dbName | The name of the database inside a Cloud SQL instance.
secretUserKey | The name of the Secret Manager secret that holds the database username.
secretKeyName | The name of the Secret Manager secret that holds the database password.

#### **Unleash (unleashClient) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the secret for client token.
unleashClientSecretName | The name of the secret (in GCP) containing the Unleash client token
unleashFlagName | The existing name for your Unleash Toggle.

If you require automated Unleash onboarding (i.e. If you don't have an existing Unleash project/toggle), 
you can do so by utilizing the template through  [Simplify](https://simplify.telus.com/create?filters%5Bkind%5D=template&filters%5Buser%5D=all) (GUI)

#### **Kong Onboarding (primavera) Attributes**
Attribute | Description
------------ | -------------
dnsName | The name to be used for the web application's subdomain.
aRecordName | The name of the ingress (i.e. A Record name) to be used for the web application.

#### **ETL Solution with Cloud Function triggered by Storage Bucket (etlStorageCf) Attributes**
Attribute | Description
------------ | -------------
sourceBucket | The name of the Google Cloud storage bucket where CSV files will be extracted from.
targetBucket | The name of the Google Cloud storage bucket where JSON files will be loaded to.

#### **DLP Solution with Cloud Function triggered by Storage Bucket (dlpStorageCf) Attributes**
Attribute | Description
------------ | -------------
sourceBucket | The name of the Google Cloud storage bucket where TXT files will be extracted from.
sensitiveBucket | The name of the Google Cloud storage bucket where de-identified sensitive documents will be moved to.
nonSensitiveBucket | The name of the Google Cloud storage bucket where non-sensitive documents will be moved to.

#### **EDA Publisher (edaPublisher) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the Firestore collection.
firestoreCollection | The name of the Firestore collection where new documents will be created.

#### **EDA Subscriber (edaSubscriber) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project containing the subscription the app will pull from.
edaPullSubscription | The ID of the pull subscription where document data will be read from.
edaTopic | The ID of the topic for the subscription (used to generate terraform files).

#### **EDA Cloud Function triggered by Firestore (edaFsTriggerCf) Attributes**
Attribute | Description
------------ | -------------
firestoreCollection | The name of the Firestore collection that will trigger this function.
edaTopic | The ID of the topic that the function will send messages to.   

#### **CQRS Command Service (cqrsCmd) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project.
dbName | The name of the database inside a Cloud SQL instance.
secretUserKey | The name of the Secret Manager secret that holds the database username.
secretKeyName | The name of the Secret Manager secret that holds the database password.
topicName | The ID of the topic that the cmd service will send messages to.

#### **CQRS Cloud Function (cqrsPubsubTriggerCf) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project.
firestoreCollection | The name of the Firestore collection that this function will write to.
cqrsTopic | The id of the topic that this function will subscribe to.

#### **CQRS Query Service (cqrsQuery) Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project.
firestoreCollection | The name of the Firestore collection that this service will read from.

#### **Unleash Attributes**
Attribute | Description
------------ | -------------
projectId | The ID of the gcp project.
unleashClientSecretName | The unleash client token stored in GCP Secret Manager.
unleashFlagName | The name of your Unleash feature toggle.

## _NOTE_  
Before attempting to execute the sample application, you must have provisioned the related GCP service to your GCP project. For more information on how to provision GCP services using Terraform scripts, follow the instructions provided [here](https://simplify.telus.com/docs/developer-docs/docs/topics/applying-terraform-configuration-in-gcp-6e4wBLR5Je9aP5Vd8y70vA.md).