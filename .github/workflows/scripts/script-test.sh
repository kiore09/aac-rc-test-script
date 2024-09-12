#!/bin/bash

# Function to get cloudFunctionVersion from JSON
get_cloud_function_version() {
  local key="$1"
  jq -r "${key}.cloudFunctionVersion" < cookiecutter.json
}

# Define mappings
declare -A card_map
declare -A version_map

# Populate card_map with values
card_map=(
  ["java:basic"]="api-java"
  ["java:gcstorage"]="api-java"
  ["java:secretmgr"]="api-java"
  ["java:postgresql"]="api-java"
  ["java:pubsub"]="api-java"
  ["java:firestore"]="api-java"
  ["java:memstore"]="api-java"
  ["java:apiClient"]="api-java"
  ["java:gqlPsql"]="api-java"
  ["java:primavera"]="api-java"
  ["java:unleashClient"]="api-java"
  ["java:etlStorageCf"]="etl-java"
  ["java:dlpStorageCf"]="dlp-java"
  ["java:edaPublisher"]="eda-java"
  ["java:edaSubscriber"]="eda-java"
  ["java:edaFsTriggerCf"]="eda-java"
  ["java:cqrsCmd"]="cqrs-java"
  ["java:cqrsPubsubTriggerCf"]="cqrs-java"
  ["java:cqrsQuery"]="cqrs-java"
  ["nodejsExpress:basic"]="api-js"
  ["nodejsExpress:gcstorage"]="api-js"
  ["nodejsExpress:secretmgr"]="api-js"
  ["nodejsExpress:postgresql"]="api-js"
  ["nodejsExpress:pubsub"]="api-js"
  ["nodejsExpress:firestore"]="api-js"
  ["nodejsExpress:memstore"]="api-js"
  ["nodejsExpress:apiClient"]="api-js"
  ["nodejsExpress:gqlPsql"]="api-js"
  ["nodejsExpress:primavera"]="api-js"
  ["nodejsExpress:unleashClient"]="api-js"
  ["nodejsExpress:etlStorageCf"]="etl-js"
  ["nodejsExpress:dlpStorageCf"]="dlp-js"
  ["nodejsExpress:edaPublisher"]="eda-js"
  ["nodejsExpress:edaSubscriber"]="eda-js"
  ["nodejsExpress:edaFsTriggerCf"]="eda-js"
  ["nodejsExpress:cqrsCmd"]="cqrs-js"
  ["nodejsExpress:cqrsPubsubTriggerCf"]="cqrs-js"
  ["nodejsExpress:cqrsQuery"]="cqrs-js"
  ["nodetsExpress:basic"]="api-ts"
  ["nodetsExpress:secretmgr"]="api-ts"
  ["nodetsExpress:gcstorage"]="api-ts"
  ["nodetsExpress:firestore"]="api-ts"
  ["nodetsExpress:postgresql"]="api-ts"
  ["nodetsExpress:gqlPsql"]="api-ts"
  ["nodetsExpress:pubsub"]="api-ts"
  ["nodetsExpress:memstore"]="api-ts"
  ["nodetsExpress:apiClient"]="api-ts"
  ["nodetsExpress:primavera"]="api-ts"
  ["nodetsExpress:etlStorageCf"]="etl-ts"
  ["nodetsExpress:dlpStorageCf"]="dlp-ts"
  ["nodejsFastify:basic"]="api-js-fastify"
  ["nodejsFastify:gcstorage"]="api-js-fastify"
  ["nodejsFastify:secretmgr"]="api-js-fastify"
  ["nodejsFastify:firestore"]="api-js-fastify"
  ["nodejsFastify:memstore"]="api-js-fastify"
  ["nodejsFastify:pubsub"]="api-js-fastify"
  ["nodejsFastify:unleashClient"]="api-js-fastify"
  ["nodetsFastify:basic"]="api-ts-fastify"
  ["nodetsFastify:secretmgr"]="api-ts-fastify"
  ["python:etlStorageCf"]="etl-python"
  ["nextjs:singlePage"]="nextjs"
  ["nextjs:multiPage"]="nextjs"
  ["nextjs:singlePageAPI"]="nextjs"
  ["nextjs:multiPageAPI"]="nextjs"
)

# Assign card and cloudFunctionVersion
key="${language}:${service}"
card="${card_map[$key]}"

# Set cloudFunctionVersion if necessary
case $card in
  *"-java" | *"-js" | *"-ts" | *"-python")
    cloudFunctionVersion=$(get_cloud_function_version "${service}")
    ;;
esac
