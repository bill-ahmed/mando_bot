#Node LTS 12
FROM node:12

# Set working dir
WORKDIR /usr/mando_bot/src

# Copy all recorded dependencies
COPY package*.json ./

# Get dependencies
RUN npm ci --only=production

# Need specific port enabled
EXPOSE 4500

# Bundle app source
COPY . .

# Build app source
RUN npm run build

# Start the server
CMD [ "NODE_ENV=production", "node", "./build/index.js" ]