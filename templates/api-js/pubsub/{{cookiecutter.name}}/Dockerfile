#==============================================================================
# Dependencies stage
FROM node:20-slim AS deps

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY ./app/package*.json ./
RUN npm install

#==============================================================================
# Runner stage
FROM node:20-slim AS runner

# Create application folder in container, set it as working directory
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps ./app/node_modules ./node_modules
COPY ./app .
COPY ./api ../api

# Install dumb-init to run the server
RUN apt update
RUN apt -y install dumb-init

EXPOSE 8080

# Start server in container
ENTRYPOINT [ "dumb-init" ]

CMD [ "node", "src/index.js" ]