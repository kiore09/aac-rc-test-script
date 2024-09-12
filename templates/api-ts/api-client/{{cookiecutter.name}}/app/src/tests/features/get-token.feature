Feature: Get access token

Scenario: Get the correct access token
Given I have required client credentials
When I enter my client credentials
Then I should get the correct access token