# See here for image contents: https://github.com/devcontainers/images/tree/main/src/java/.devcontainer/base.Dockerfile

# [Choice] Java version (use -bullseye variants on local arm64/Apple Silicon): 11, 17, 11-bullseye, 17-bullseye, 11-buster, 17-buster
FROM mcr.microsoft.com/devcontainers/java:17-bookworm

# Install Maven via SDKman
RUN su root -c ". /usr/local/sdkman/bin/sdkman-init.sh && sdk install maven"
# Install latest LTS Node via NVM (merge stderr with stdout) - needed for Sonarlint to scan YAML files
RUN su root -c ". /usr/local/share/nvm/nvm.sh && nvm install 'lts/*' 2>&1"

# Install Google Cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && \
    apt-get update -y && \
    apt-get install -y \
        google-cloud-cli
