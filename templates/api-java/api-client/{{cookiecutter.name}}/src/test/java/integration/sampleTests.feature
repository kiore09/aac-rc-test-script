Feature: Sample feature to demo integration testing

Scenario: Calling an endpoint that makes a request to another server (to be mocked by wiremock)
Given url 'http://localhost:8080/integration/test'
When method GET
Then status 200
Then match response == { someProperty: "someData" }