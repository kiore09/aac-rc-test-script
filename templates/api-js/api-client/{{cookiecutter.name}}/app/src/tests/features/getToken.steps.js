const {When, Then, Given} = require('@cucumber/cucumber');
const assert = require('assert');


let token_response = true; 
let clientID; 
let clientSecret; 
let token_scope;

Given("I have required client credentials", () => {
    clientID = "this_is_test_id";
    clientSecret = "this_is_test_secret";
    token_scope = "123";
});
When("I enter my client credentials", () => {
    fetch('http://localhost:8085/st/token', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`
        },
        body: JSON.stringify({
            'grant_type': 'client_credentials',
            'scope': token_scope
        })
    }).then(response => {
        if (response.status != 202) {
            token_response = false;
        }
    });
});
Then("I should get the correct access token", () => {
    assert.equal(token_response, true);
});
