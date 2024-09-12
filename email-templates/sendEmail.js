const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const CONSTANTS = JSON.parse(fs.readFileSync('./constants.json', {encoding: 'utf8'}));

// Retrieve parameters for sending the email from the command line
const TO_ADDRESS = process.argv[2];
const TOKEN = process.argv[3];
const REPO_NAME = process.argv[4];
const LANGUAGE = process.argv[5];
const TEMPLATE = process.argv[6];
const CICD = process.argv[7];

// Configs for reaching the SMTP Proxy
const EMAIL_PROXY_URL = 'https://apigw-st.telus.com/common/sendEmailProxy/v1/';
const FROM_ADDRESS = 'arch-as-code-do-not-reply@dev.gapps.telus.com';
const SUBJECT = 'Architecture as Code - Software Template';

console.log(`To: ${TO_ADDRESS}`);
console.log(`Repo: ${REPO_NAME}`);
console.log(`Language: ${LANGUAGE}`);
console.log(`Template: ${TEMPLATE}`);
console.log(`CI/CD included: ${CICD}`);


/**
 * 
 * @param {*} repoName 
 * @returns HTML element containing a link to the repo
 */
const getRepoLink = (repoName) => {
  return `<a href="https://github.com/${repoName}">${repoName}</a>`;
}


/**
 * 
 * @param {*} template 
 * @returns 
 */
const getTemplate = (template) => {
  return CONSTANTS.service[template];
}


/**
 * Convert the programming language to a user-friendly string
 * @param {*} lang
 * @returns 
 */
const getLanguage = (lang) => {
  return CONSTANTS.language[lang];
}


// Load and fill in the contents of the email body
const emailTemplate = fs.readFileSync('./welcome.html', {encoding: 'utf8'});
const template = getTemplate(TEMPLATE);
const repoLink = getRepoLink(REPO_NAME);
const language = getLanguage(LANGUAGE);

const emailContent = emailTemplate.replaceAll('${repoLink}', repoLink)
  .replaceAll('${template}', template)
  .replaceAll('${language}', language)
  .replaceAll('${includeCicd}', CICD);

// Create multipart/form-data request body
const form = new FormData();
form.append('from', FROM_ADDRESS);
form.append('to', TO_ADDRESS);
form.append('subject', SUBJECT);
form.append('isHtmlBody', 'true');
form.append('bodyText', emailContent);

// Include access token in the request headers
const headers = {
  ...form.getHeaders(),
  'Authorization': `Bearer ${TOKEN}`
}
const emailOptions = { ...axios.defaults, headers };

// Send the email, then log the response
axios.post(EMAIL_PROXY_URL, form, emailOptions)
  .then(resp => {
    console.log(`Status: ${resp.status}`);
    console.log(`Returned data: ${JSON.stringify(resp.data)}`);
  });