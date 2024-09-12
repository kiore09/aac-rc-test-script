## GCP Cloud Scheduler
Cloud Scheduler allows you to schedule any type of job such as recurring batch processing, scheduled data management tasks, cloud infrastructure operations, etc. You can even automate retries in case of failures to reduce manual interventions.   
For more detailed information about the features of the GCP Cloud Scheduler, see [here.](https://cloud.google.com/scheduler)   

The most common use case for GCP scheduler is to trigger an event on a predefined recurring schedule. This event can then be consumed by any subscribing service to take necessary action. For this reason, we have provided a [sample Scheduler for PubSub](sample-scheduler-pubsub.yaml) that you can use for scheduling such operations.   

Note: The sample script creates a PubSub Topic, 'scheduler_topic' that the scheduler will publish messages to. If you already have a Topic, you can comment out this section of the script, comment out the 'depends_on' parameter of the scheduler module, and replace the 'topic_name' with your existing topic name.   

Follow these steps to deploy and test the sample Cloud Scheduler:   
1- Update the 'pubsub_data' value to publish your desired message to the Topic.   
2- Update the 'schedule' value to reflect the desired frequency of the job. For more detailed information about configuring the schedule frequency, see [here](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules)   
3- Copy the yaml file to your tf-infra repository for your GCP project.   
4- Follow the instructions [here](https://simplify.telus.com/docs/developer-docs/docs/topics/applying-terraform-configuration-in-gcp-6e4wBLR5Je9aP5Vd8y70vA.md) to deploy the scheduler to your GCP Project.

### GCP Resource Deployment Tutorial Video

View this tutorial video on how to [Provision GCP Resources using Terraform](https://drive.google.com/file/d/1W0vaGDTZoZqCNUXHFZnekFY89rmcnqOY/view?usp=sharing)
