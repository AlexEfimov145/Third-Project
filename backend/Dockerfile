# Use the official Node.js 14 image.
FROM node:14

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application files.
COPY tsconfig.json ./
COPY src ./src
COPY config ./config

# Install global dependencies.
RUN npm install -g ts-node typescript nodemon

# Expose port 8080.
EXPOSE 8080

# Define the command to run the application.
CMD ["npm", "start"]