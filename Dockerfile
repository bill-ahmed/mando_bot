#Node LTS 12
FROM node:12

RUN mkdir -p /usr/mando_bot/src

# Set working dir
WORKDIR /usr/mando_bot/src

# Copy all recorded dependencies
COPY package*.json ./

# Get dependencies
RUN npm ci --production --silent

# Need specific port enabled
EXPOSE 4500

# Bundle app source
COPY . .

# Start the server
CMD [ "node", "./build/index.js" ]