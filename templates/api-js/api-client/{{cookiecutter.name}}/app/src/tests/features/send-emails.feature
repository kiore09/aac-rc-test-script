Feature: Send Emails

Scenario: Send emails to smtp proxy
Given I have required access token
When I enter contents of emails
Then It should send 202