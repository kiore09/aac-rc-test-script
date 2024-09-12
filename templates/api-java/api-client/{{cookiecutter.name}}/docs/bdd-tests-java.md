# **BDD Testing**

This sample application includes a demo integration test run with the [Karate framework](https://github.com/karatelabs/karate). The application endpoint called by
the test depends on another backend service, whose API is mocked by a Wiremock server. The token retrieval endpoint is also mocked by Wiremock.

To run the integration tests locally:
- In your terminal, `cd` into your [project directory](..) (which contains the `wiremock/` directory)
- Run `docker run -d -p 8085:8080 -v $PWD/wiremock:/home/wiremock --name wiremock wiremock/wiremock:2.33.1` to start the wiremock server (which will load the
configurations in the `wiremock/` directory)
- Run `export SPRING_PROFILES_ACTIVE=test` to load the config values for integration testing - this swaps out the real API calls with the mocked API on `localhost:8085`
- Run `mvn integration-test -Dskip.unit.tests=true` to run the BDD tests (exclude the flag if you also want to run unit tests)

To see how this runs in a github action, refer to [this workflow file](../.github/workflows/code-coverage-java.yml).

## **Karate and Maven Configuration**
In this sample application, the `maven-failsafe-plugin` defined in [pom.xml](../pom.xml) triggers a
[Runner class](../src/test/java/integration/SampleKarateRunner.java) - which then executes the test scenarios in the `.feature` files.
The `<testResources>` section under `<build>` in pom.xml sets the `classpath` variable, which Karate uses to find `.feature` files.
The settings under `maven-failsafe-plugin` lets maven know where to find the Runner classes.

## **Wiremock Server Configuration**
The `wiremock/` directory provides an example configuration for a wiremock server, to be run in a docker container. Since the sample application runs on port 8080
by default, the docker container should listen on a different port (the example above uses 8085.) The JSON files in the `mappings/` directory
determine the endpoints to be mocked, and the JSON files under `__files` serve as responses to be returned by the mocked endpoints. You may also directly
set the response in the mapping using the `response.jsonBody` property.