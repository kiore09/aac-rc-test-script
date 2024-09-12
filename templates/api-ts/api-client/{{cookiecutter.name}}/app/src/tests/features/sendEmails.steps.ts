import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

let email_response = true;
let clientID; 
let clientSecret; 
let token_scope;

Given("I have required access token", () => {
  clientID = "this_is_test_id";
  clientSecret = "this_is_test_secret";
  token_scope = "123";
  process.env.TOKEN = "mock_token_value"
});
When("I enter contents of emails", () => {
  const token = process.env.TOKEN;
  const formData = new FormData();
  formData.append('from', 'this_is_from');
  formData.append('to', 'this_is_to');
  formData.append('subject', 'this_is_subject');
  formData.append('bodyText', 'this_is_body');

  fetch('http://localhost:8085/telus/common/sendEmailProxy/v1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  }).then(response => {
    if (response.status != 202) {
      email_response = false;
    }
  });
});
Then("It should send 202", () => {
  assert.equal(email_response, true);
});
