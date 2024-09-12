# Copy the appropriate coverage file to the appropriate directory, based on
# selected language and framework.
# This is done to ensure Risk Engine detects a test coverage file when user
# uncomments the testCoverage input in the Risk Engine config .yaml
projectName=$(jq -r '.name' cookiecutter.json)
smeProgrammingLanguage=$(jq -r '.sampleCode.programmingLanguage' cookiecutter.json)

case $smeProgrammingLanguage in 
  "java")
    mkdir -p ./cookie-temp/$projectName/target/site/jacoco/
    cp ./shared/coverage/jacoco.xml ./cookie-temp/$projectName/target/site/jacoco/jacoco.xml
  ;;
  "nodejsExpress"|"nodetsExpress")
    mkdir -p ./cookie-temp/$projectName/app/coverage/
    cp ./shared/coverage/coverage-summary.json ./cookie-temp/$projectName/app/coverage/coverage-summary.json
  ;;
  "nodejsFastify"|"nodetsFastify")
    mkdir -p ./cookie-temp/$projectName/app/.tap/report/
    cp ./shared/coverage/coverage-summary.json ./cookie-temp/$projectName/app/.tap/report/coverage-summary.json
  ;;
esac