
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
