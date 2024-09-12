#==============================================================================
# Dependencies stage
FROM node:18.19.0-bookworm-slim AS deps

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY ./app/package*.json ./
RUN npm install

#==============================================================================
# Runner stage
FROM node:18.19.0-bookworm-slim AS runner

# Create application folder in container, set it as working directory
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps ./app/node_modules ./node_modules
COPY ./app .
COPY ./api ../api

# Install fastify-cli (global) and dumb-init to run the server
RUN npm install -g fastify-cli
RUN apt update
RUN apt -y install dumb-init

EXPOSE 8080

# Start server in container
ENTRYPOINT [ "dumb-init" ]

CMD [ "fastify", "start", "-L", "src/logger.js", "--address=0.0.0.0", "src/server.js"]