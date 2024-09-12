#!/bin/bash

# SME variables
includeCicd=$(jq -r '.includeCicd' cookiecutter.json)
smeDependencyType=$(jq -r '.sampleCode.gcpServiceSample' cookiecutter.json) 
smeGkeCluster=$(jq -r '.cicd.gkeCluster' cookiecutter.json)
smeGkeNamespace=$(jq -r '.cicd.namespace' cookiecutter.json)
smeGcpProjectId=$(jq -r ".$smeDependencyType.projectId" cookiecutter.json)
smeProgrammingLanguage=$(jq -r '.sampleCode.programmingLanguage' cookiecutter.json)

# Cloud Storage variables
bucketName=$(jq -r '.gcstorage.storageBucket' cookiecutter.json)

# Firestore variables
firestoreName=$(jq -r '.firestore.firestoreCollection' cookiecutter.json)

# Secret Manager variables
secretName=$(jq -r '.secretmgr.sampleSecret' cookiecutter.json)

# PubSub variables
topicName=$(jq -r '.pubsub.topicName' cookiecutter.json)
subscriptionName=$(jq -r '.pubsub.subscriptionName' cookiecutter.json)

# Memorystore variables
redisName=$(jq -r '.memstore.redisName' cookiecutter.json)

# CloudSQL variables
dbName=$(jq -r '.postgresql.dbName' cookiecutter.json)
dbUserSecretName=$(jq -r '.postgresql.secretUserKey' cookiecutter.json)
dbPassSecretName=$(jq -r '.postgresql.secretKeyName' cookiecutter.json)

# Graphql + cloudSQL variables
dbName=$(jq -r '.gqlPsql.dbName' cookiecutter.json)
secretUserKey=$(jq -r '.gqlPsql.secretUserKey' cookiecutter.json)
secretKeyName=$(jq -r '.gqlPsql.secretKeyName' cookiecutter.json)

# Unleash client variables
unleashSecretName=$(jq -r '.unleashClient.unleashClientSecretName' cookiecutter.json)
unleashToggleName=$(jq -r '.unleashClient.unleashFlagName' cookiecutter.json)

# Outbound Email Client variables
clientIdSecretName=$(jq -r '.apiClient.clientIdSecretName' cookiecutter.json)
clientSecretName=$(jq -r '.apiClient.clientSecretName' cookiecutter.json)
apiUrlEndpoint=$(jq -r '.apiClient.apiEndpointUrl' cookiecutter.json)

# Case statement to handle specific Programming language.
# If $smeProgrammingLanguage is, e.g.,'java':
#   - Utilize jq to add example.oas3.json path.
#   - Move the modified system diagram to the appropriate location.

case $smeProgrammingLanguage in 
    "nodejsExpress"|"nodejsFastify"|"nodetsExpress"|"nodetsFastify"|"java")
        jq \
            '.["system-view"].system.component += {
                "definition-url": "https://github.com/'"$GITHUB_REPOSITORY"'/blob/'"${GITHUB_REF##*/}"'/api/example.oas3.json",
            }' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file_sme.json
        mv temp_file_sme.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
    ;;
esac

# Add GCP Project ID value to systemDiagram.json file
jq --arg gcpProjectId "$smeGcpProjectId" \
    '.["system-view"].system.component += {
                "gcp-project": $gcpProjectId,
            }' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
    mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json

# Conditional block to update the system diagram with GCP details.
# If $includeCicd is true:
#   - Utilize jq to add GCP-related details to the system diagram.
#   - Move the modified system diagram to the appropriate location.

if [ "$includeCicd" == true ]; 
    then
        jq --arg gkeCluster "$smeGkeCluster" \
            --arg gkeNamespace "$smeGkeNamespace" \
            '.["system-view"].system.component += {
                "gke-cluster": $gkeCluster,
                "gke-namespace": $gkeNamespace
            }' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file_sme.json
        mv temp_file_sme.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
    fi

# Creating a JSON string representing SME dependencies.
# - "name": Name of the system component.
# - "direction": Access direction (read and write).
# - "vendor": Cloud service provider (in this case, 'GCP').
# - "type": Type of dependency (may vary depending on the implementation).
# - "network": Associated network (in this case, 'GCP').
# - "gcp-project": Associated Google Cloud Platform project.


# Cloud Storage JSON
cloud_storage_dependencies='{
    "name": "'$bucketName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "storage-bucket",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Firestore JSON
firestore_dependencies='{
    "name": "'$firestoreName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "firestore",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Secret Manager JSON
secret_manager_dependencies='{
    "name": "'$secretName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Pub/Sub JSON
pub_dependencies='{
    "name": "'$topicName'",
    "direction": "out",
    "vendor": "GCP",
    "type": "pubsub-topic",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

sub_dependencies='{
    "name": "'$subscriptionName'",
    "direction": "in",
    "vendor": "GCP",
    "type": "pubsub-subscription",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Memorystore JSON
memorystore_dependencies='{
    "name": "'$redisName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "memorystore",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Postgresql CloudSQL JSON
database_name_dependencies='{
    "name": "'$dbName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "database",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

database_secret_user_dependencies='{
    "name": "'$dbUserSecretName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

database_secret_pass_dependencies='{
    "name": "'$dbPassSecretName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# GraphQL + CloudSQL
database_name_dependencies='{
    "name": "'$dbName'",
    "direction": "read+write",
    "vendor": "GCP",
    "type": "database",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

database_secret_user_dependencies='{
    "name": "'$secretUserKey'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

database_secret_pass_dependencies='{
    "name": "'$secretKeyName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

# Unleash client JSON
unleash_client_dependencies='{
    "name": "'$unleashSecretName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

unleash_toggle_dependencies='{
    "name": "'$unleashToggleName'",
    "direction": "read",
    "vendor": "Other",
    "type": "external-api",
    "network": "Internet"
}'

# Api Client JSON
client_id_secret_name_dependencies='{
    "name": "'$clientIdSecretName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

client_secret_name_dependencies='{
    "name": "'$clientSecretName'",
    "direction": "read",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GCP",
    "gcp-project": "'$smeGcpProjectId'"
}'

consumes_apis='{
    "name": "sendEmailProxy_V1",
    "cmdb-id": "21740",
    "vendor": "GCP",
    "type": "secret-manager",
    "network": "GKE-Private",
    "gke-project": "cdo-gke-private-np",
    "gcp-project": "cdo-send-smtp-proxy-np",
    "gke-cluster": "private-na-ne1-001",
    "gke-namespace": "send-smtp-proxy",
    "api-url": "'$apiUrlEndpoint'"
}'

# Case statement to handle specific system dependency types.
# If $smeDependencyType is, e.g.,'storage-bucket':
#   - Utilize jq to add cloud storage dependencies to the temp_file.json.
#   - Move the modified system diagram to the appropriate location.

case $smeDependencyType in
    "gcstorage")
        jq --argjson new_dep "$cloud_storage_dependencies" \
        '.["system-view"].system.component.dependencies += [$new_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "firestore")
        jq --argjson new_dep "$firestore_dependencies" \
        '.["system-view"].system.component.dependencies += [$new_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "secretmgr")
        jq --argjson new_dep "$secret_manager_dependencies" \
        '.["system-view"].system.component.dependencies += [$new_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;
        
    "pubsub")
         jq --argjson pub_dep "$pub_dependencies" --argjson sub_dep "$sub_dependencies" \
        '.["system-view"].system.component.dependencies += [$pub_dep, $sub_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "memstore")
        jq --argjson new_dep "$memorystore_dependencies" \
        '.["system-view"].system.component.dependencies += [$new_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;
            
    "postgresql")
         jq --argjson psql_name_dep "$database_name_dependencies" --argjson psql_user_dep "$database_secret_user_dependencies" --argjson psql_pass_dep "$database_secret_pass_dependencies" \
        '.["system-view"].system.component.dependencies += [$psql_name_dep, $psql_user_dep, $psql_pass_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "gqlPsql")
        jq --argjson gql_name_dep "$database_name_dependencies" --argjson gql_user_dep "$database_secret_user_dependencies" --argjson gql_pass_dep "$database_secret_pass_dependencies" \
        '.["system-view"].system.component.dependencies += [$gql_name_dep, $gql_user_dep, $gql_pass_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "unleashClient")
        jq --argjson unleash_client_dep "$unleash_client_dependencies" --argjson unleash_toggle_dep "$unleash_toggle_dependencies" \
        '.["system-view"].system.component.dependencies += [$unleash_client_dep, $unleash_toggle_dep]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;

    "apiClient")
        jq --argjson consumes_apis "$consumes_apis" \
        --argjson id_secret_name "$client_id_secret_name_dependencies" \
        --argjson secret_name "$client_secret_name_dependencies" \
        '.["system-view"].system.component["consumes-apis"] += [$consumes_apis] |
        .["system-view"].system.component.dependencies += [$id_secret_name, $secret_name]' ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json >> temp_file.json
        mv temp_file.json ./shared/sme/{{cookiecutter.name}}/.systemDiagram/systemDiagram.json
        ;;
esac
