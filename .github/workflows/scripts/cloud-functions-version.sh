#!/bin/bash

echo "Running cloud-functions-version.sh script"
if [ "$cloudFunctionVersion" == "2gen" ]; then
    file="./cloudbuild.yaml"
    # Use sed to add the --gen2 line after --ingress-settings=internal-only
    sed -i '/--ingress-settings=internal-only/a\      - --gen2' "$file"
    # Use sed to remove - --no-gen2 line
    sed -i '/--no-gen2/d' "$file"

    if [ "$service" == "edaFsTriggerCf" ] && [ "$language" == "java" ]; then
        file="./cloudbuild.yaml"
        # Remove specific lines for `java` and `eda-cf`
        sed -i '/--trigger-event=providers\/cloud.firestore\/eventTypes\/document.create/d' "$file"
        sed -i '/--trigger-resource=projects\/${PROJECT_ID}\/databases\/(default)\/documents\/${_FIRESTORE_COLLECTION}\/{documentId}/d' "$file"
        # Add new lines for `java` and `eda-cf`
        sed -i '/--gen2/a\      - --trigger-event-filters=type=google.cloud.firestore.document.v1.created' "$file"
        sed -i '/--gen2/a\      - --trigger-event-filters=database=(default)' "$file"
        sed -i '/--gen2/a\      - --trigger-event-filters-path-pattern=document=${_FIRESTORE_COLLECTION}/{documentId}' "$file"

    fi
fi