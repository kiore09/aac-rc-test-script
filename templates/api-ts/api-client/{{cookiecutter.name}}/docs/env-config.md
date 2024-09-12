# Environment Configurations
The `app` folder contains the project's `package.json` file, `index.ts` which is the entry point to the application. 
As listed by the files within `app/config`, there are four environment configurations files could be chosen if needed, which are `st`, `dev`, `pr` and `default`. You can set the application to use the different environment configuration locally by changing the `NODE_ENV` value in the terminal. For example, to ensure the application is using the  `pr` configuration, we can set the environment by entering the following command into the terminal: 
```
cd app

NODE_ENV=pr
```
Do not add secrets directly into `.env`; any secret values should be managed by GCP's Secret Manager.

## Deploying to Different Environments in GKE

### Deploying to Development and Staging Environments on GKE
In order for your app to use the proper environment configuration file under `config/` folder for a given environment on GKE, you will need to update the helm charts in your CI/CD
pipeline ([see here](../README.md#including-cicd-for-your-api) to include CI/CD.) Go to the `helm/` folder and for each helm chart `.yaml`, add the environment variable
`NODE_ENV` under `extraEnvs`, then add the environment's name as the `value`. For example, to ensure desired configuration file is used when deploying to the
`dev` environment on GKE - update `your-project-dev.yaml` with:

```
extraEnvs:
  - name: NODE_ENV
    value: dev
```

Any other environment variables required for your app can also be added under `extraEnvs`. 

### Deploying to Production Environment on GKE

Please make sure the `pr.ts` file under the `config/` folder is correct, and that your GKE Helm chart `your-project-pr.yaml` is updated with **production** environment values (which are most likely different from non-prod):

```
extraEnvs:
  - name: NODE_ENV
    value: pr
```