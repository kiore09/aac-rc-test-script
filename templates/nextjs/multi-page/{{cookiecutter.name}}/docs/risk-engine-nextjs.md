# Risk Engine Quickstart

This starter template includes a [Risk Engine configuration file](../.platform/.riskEngineConfig.yaml) and a [Pull Request Template](../.github/pull_request_template.md).
Full details about the Risk Engine can be found in [this repository](https://github.com/telus/sre-risk-engine).

## Risk Engine Configuration File

The presence of the [Risk Engine configuration file](../.platform/.riskEngineConfig.yaml) under the `.platform` directory will trigger a risk assessment whenever a pull request is created.
A comment will be left by the Risk Engine in the pull request, with a detailed breakdown of the risk assessment criteria and scoring.

The settings in the configuration file define the parameters of a risk assessment - they can be adjusted to suit the specific needs of your application. In particular:
- `riskThreshold` defines the maximum "passing" risk score for a pull request
- Plugins are listed under `riskInputs` which define the risk assessment criteria (i.e. they determine what the Risk Engine will analyze and score)

> Visit the [Risk Engine repository](https://github.com/telus/sre-risk-engine) for more information about available plugins, other configuration settings, etc.

## Test Coverage First Steps
> [!IMPORTANT] 
> Please uncomment the following lines in your [.platform/.riskEngineConfig.yaml](../.platform/.riskEngineConfig.yaml) to enable the Risk Engine to analyze the test coverage report prior to assessing a Pull Request. Ensure that the `covReportPath:` matches the path where the coverage report is saved in your repository: 
```
riskInputs:
   - name: testCoverage
     covReportPath: <path to your coverage report file>
     coverageReportType: "jsonSummary"
```
![alt text](testCoverageError.jpg)

To ensure that the **Test Coverage** input does not error out (like above), you will need to commit a code coverage file to the repository - for Javascript this is `coverage-summary.json`. The Risk Engine will look for the code coverage file at the path given by `covReportPath` in
the [Risk Engine configuration file](../.platform/.riskEngineConfig.yaml) - edit this path if you wish to upload the coverage file at a different location.

- With Cypress code-coverage integration you can generate the `coverage/coverage-summary.json` and `.nyc_output/out.json` by running all Cypress tests and the `nyc module` once before uploading your code coverage file. 

> For more information please refer to [Cypress.io Code Coverage documentation](https://docs.cypress.io/guides/tooling/code-coverage).

Let's do so by first running the server in one terminal:
```
npm run dev
```
and in another terminal run:
```
npm test
npx nyc report --reporter=text-summary
```

**Note:** After running the tests and nyc module one initial time, the `coverage-summary.json` and `out.json` files will be generated and used in the Risk Engine Assessment and Code Coverage workflow.

Once the coverage file is uploaded, open a Pull Request on the repository and wait for the Risk Engine Assessment to complete. You should no longer see the error in
the risk assessment results. Note that the Risk Engine will not be able to compare the coverage history on this first Pull Request, the message should disappear on
subsequent Pull Requests.

![alt text](testCoverageFixed.jpg)

 The code coverage workflow will also produce a download link to the code coverage report (lcov-report) in the `Code Coverage - NodeJS NextJS workflow` found in your GitHub Actions tab.
 
![alt text](code-coverage-workflow.jpg)

![alt text](code-coverage-download.jpg)

## Known Issues

- If the code coverage file has not been committed/updated by the developer in a Pull Request, the Risk Engine will run using the existing code coverage file (if any) which will not reflect the newest changes in a branch (or display an error in the Risk Engine results if no such file was found.) The provided code-coverage workflow will autocommit code coverage files once it is done running, but the Risk Engine will not pick it up until the next scan.

## Pull Request Template

The [Pull Request Template](../.github/pull_request_template.md) is effectively a form that developers will fill out when creating a pull request - this form is
displayed within the pull request description. The template and its validation criteria can be edited to suit the needs of your project. It is also optional and
can be removed from the risk engine assessment by deleting the `prDescription` risk input from the [Risk Engine configuration file](../.platform/.riskEngineConfig.yaml):
```
riskInputs:
  - name: prDescription
    prTemplatePath: ".github/pull_request_template.md"
```