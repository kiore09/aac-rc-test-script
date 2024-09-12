# **E2E and Component Testing with Cypress.io Framework**

To integrate unit test in the application, the Cypress.io JavaScript testing framework is used.
For more details, please refer to [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress/)

Cypress provides an all-encompassing testing framework equipped with JavaScript support, assertion libraries, and stubbing capabilities. Our example tests are organized in either the `cypress/e2e` or `src/components/__tests__` directory.

The provided tests are based on a sample UI application. You can adapt these tests or create new ones to suit your application's specific requirements.
* Example E2E tests are written in [home.cy.js](../cypress/e2e/home.cy.js).
* Example component tests are written in [RandomImage.cy.js](../src/components/__tests__/RandomImage.cy.js), [FileUpload.cy.js](../src/components/__tests__/FileUpload.cy.js), and [FileTable.cy.js](../src/components/__tests__/FileTable.cy.js).
* To create a new test, follow the naming convention `{test_name}.cy.js`. Please note the `.cy.js` extension.
* Example fixture files [example-small.txt](../cypress/fixtures/example-small.txt) and [example-large.txt](../cypress/fixtures/example-large.txt) for our example upload implementation are located in the `cypress/fixtures` directory.
* Example download files for our download implementation are downloaded to the `cypress/downloads` directory.
* Example static [sampleData.js](../public/data/sampleData.js) file for our download implementation are located in the `public/data/sampleData` directory.

## Installing and Setting Up Cypress

Cypress is compatible with various browsers, but for this sample application, we recommend running it with Google Chrome or Microsoft Edge to align with our organization's environment. For simplicity, it is suggested to use GitBash for running Cypress tests with Chrome or Edge, as other environments may require additional configuration.

To execute UI tests, follow these steps:

1) Run application in one terminal window
```bash
npm install
npm run dev
```

2) Then in another terminal window run the with Test Runner interface (Cypress Launchpad):
```bash
npm run cypress
```
This will launch the Cypress Test Runner, where you can select and run individual tests or the entire test suite.

3) To run tests located in the cypress folder in headless mode (without the Test Runner interface), use the following command:
```bash
npm run test
```
This command will execute tests inside the cypress folder in the background and provide the test results in the console.

## Cypress Test Runner interface

Choose a test you want to run from the Cypress Launchpad. Ensure a smooth test execution by selecting `Chrome` as your preferred browser, as the tests are specifically written for the Google Chrome environment. All available tests are auto-detected and located in the `cypress/e2e` and `src/components/__tests__` directories.
