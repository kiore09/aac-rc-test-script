# Backstage Software Catalog

Software Catalog is the basis for Backstage (Simplify). By adding a catalog-info into your repo, your application will be registered automatically in the catalog. This unlocks a lot of features in Backstage that you will be able to take advantage of.

## Setup
Upon creation of the app repo, the lifecycle is initially set to "testing".

**Note:** Setting the lifecycle to "production" or "staging" is intentionally a manual process. Developer has to update the catalog-info.yaml to reflect the appropriate lifecycle: staging before or after the service is deployed to the Dev/Staging environment, production before or after the service is deployed to the Production environment
