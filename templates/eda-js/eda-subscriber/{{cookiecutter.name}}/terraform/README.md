## Terraform files for the project

The ***'firestore-{{ cookiecutter.name }}.tf'*** and ***'pubsub-{{ cookiecutter.name }}.tf'*** files have been generated for provisioning the Firetsore with a sample collection and document, and the sample PubSub Topic and pull subscription for your testing purposes.  

Before attempting to execute the sample application, if you haven't already provisioned Firestore and the sample PubSub Topic and Pull Subscription to your GCP Project, copy the 'firestore-{{ cookiecutter.name }}.tf' and 'pubsub-{{ cookiecutter.name }}.tf' files to the *terraform* folder in the **tf-infra** repository for you GCP Project and follow the instructions provided [here](https://simplify.telus.com/docs/developer-docs/docs/topics/applying-terraform-configuration-in-gcp-6e4wBLR5Je9aP5Vd8y70vA.md).

### GCP Resource Deployment Tutorial Video

View this tutorial video on how to [Provision GCP Resources using Terraform](https://drive.google.com/file/d/1W0vaGDTZoZqCNUXHFZnekFY89rmcnqOY/view?usp=sharing)