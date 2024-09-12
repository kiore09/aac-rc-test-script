In order to activate the DLP API in your project for the first time, you need to post the following request with your project information:

curl --request POST \
 "https://dlp.googleapis.com/v2/projects/<YOUR-PROJECT-ID>/locations/northamerica-northeast1/content:inspect" \
      --header "X-Goog-User-Project: <YOUR-PROJECT-ID>" \
      --header "Authorization: Bearer $(gcloud auth print-access-token)" \
      --header 'Accept: application/json' \
      --header 'Content-Type: application/json' \
      --data '{"item":{"value":"google@google.com"}}' \
      --compressed