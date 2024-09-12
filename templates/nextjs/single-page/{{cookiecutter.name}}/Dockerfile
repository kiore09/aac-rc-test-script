#==============================================================================
# Dependencies stage
FROM node:20-slim AS deps

# Create and set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

#==============================================================================
# Build stage
FROM node:20-slim AS build

# Create and set working directory in container
WORKDIR /app

# Copy dependencies from deps stage, and copy source code (entire app)
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the NextJS app (to .next folder)
RUN npm run build --if-present

#==============================================================================
# Runner stage
FROM node:20-slim AS runner

# Create and set working directory in container
WORKDIR /app

# Install dumb-init to run the server
RUN apt update
RUN apt -y install dumb-init

# Copy built NextJS app (set user as owner), public assets, runtime environment
# configs, node dependencies, package.json, and the server startup script from the builder stage
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Set user
USER node

# Expose the listening port
EXPOSE 3000

# Start server in container
ENTRYPOINT [ "dumb-init" ]

CMD ["npm", "run", "start"]
