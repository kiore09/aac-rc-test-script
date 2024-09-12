# **Unit Testing**

This sample application uses the [Jest unit testing framework](https://jestjs.io/docs/getting-started) to execute unit tests and for mocking dependencies in test scripts.
The unit tests in this sample are located under [app/src/tests](../app/src/tests/), where each unit test file has the extension `.test.js`.
Specifics about the syntax used for unit testing is added as comments to those test files.

Before running the unit tests, make sure you have installed the required dependencies by running:

    cd app

    # If using npm:
    npm install

    # If using yarn:
    yarn install

Then run all unit tests using the following command:

    # If using npm:
    npm run test

    # If using yarn:
    yarn run test

Jest can monitor test files and reload changes to them automatically when they are saved. To have Jest watch tests, run one of the following commands:

    npm run test:watch
    yarn run test:watch
