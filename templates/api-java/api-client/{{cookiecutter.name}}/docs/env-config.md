# Environment Configurations

Spring Boot uses [Spring Profiles](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.profiles) to configure the application differently for
each environment (for example, the GCP project ID will likely differ in a non-production environment vs a production environment.) This template offers these profile-specific
`application.properties` files (found under `src/main/resources/`):
* `application.properties` - contains the `default` configuration values (useful for local/codespace development)
* `application-dev.properties`, `application-st.properties`, `application-pr.properties` - contains overrides for the `dev`, `st`, and `pr` environments respectively
* `application-test.properties` - contains overrides for the integration `test` environment

Set the environment variable `SPRING_PROFILES_ACTIVE=<profile name>` to load the properties for a particular environment, or leave it unset to use the `default` profile. For example, to use the configuration values for the `dev` environment:

```bash
# On a -nix based OS
> export SPRING_PROFILES_ACTIVE=dev

# In a Windows Powershell terminal
> $Env:SPRING_PROFILES_ACTIVE="dev"
```

For more information on Properties and Configuration in Spring Boot, see the official documentation [here](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.properties-and-configuration).

## Deploying to Different Environments in GKE

In order for your app to use the proper `application-<profile name>.properties` file for a given environment on GKE, you will need to
update the helm charts in your CI/CD pipeline ([see here](../README.md#including-cicd-for-your-api) to include CI/CD.) Go to the `helm/` folder and for each helm chart
`.yaml`, add the environment variable `SPRING_PROFILES_ACTIVE` under `extraEnvs`, then add the environment's name as the `value`. For example, to ensure
`application-pr.properties` is used when deploying to the `pr` environment on GKE - update `your-project-pr.yaml` with:

```
extraEnvs:
  - name: SPRING_PROFILES_ACTIVE
    value: pr
```

Any other environment variables required for your app can also be added under `extraEnvs`.